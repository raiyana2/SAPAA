import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewReportPage from '../../app/detail/[namesite]/new-report/page';
import MainContent from '../../app/detail/[namesite]/new-report/MainContent';
import StickyFooter from '../../app/detail/[namesite]/new-report/Footer';

// --- Mock setup ---
const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ namesite: 'Test%20Site' }),
  useRouter: () => ({ push: mockPush, back: mockBack }),
  usePathname: () => '/detail/Test%20Site/new-report',
}));

jest.mock('next/image', () => (props: any) => <img {...props} alt={props.alt} />);

const mockGetQuestionsOnline = jest.fn();
const mockIsSteward = jest.fn();
const mockGetCurrentUserUid = jest.fn();
const mockGetCurrentSiteId = jest.fn();
const mockAddSiteInspectionReport = jest.fn();
const mockGetQuestionResponseType = jest.fn();
const mockUploadSiteInspectionAnswers = jest.fn();
const mockGetSitesOnline = jest.fn();

jest.mock('@/utils/supabase/queries', () => ({
  getQuestionsOnline: (...args: any[]) => mockGetQuestionsOnline(...args),
  isSteward: (...args: any[]) => mockIsSteward(...args),
  getCurrentUserUid: (...args: any[]) => mockGetCurrentUserUid(...args),
  getCurrentSiteId: (...args: any[]) => mockGetCurrentSiteId(...args),
  addSiteInspectionReport: (...args: any[]) => mockAddSiteInspectionReport(...args),
  getQuestionResponseType: (...args: any[]) => mockGetQuestionResponseType(...args),
  uploadSiteInspectionAnswers: (...args: any[]) => mockUploadSiteInspectionAnswers(...args),
  getSitesOnline: (...args: any[]) => mockGetSitesOnline(...args),
}));

const mockGetUser = jest.fn();

jest.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
  }),
}));

// --- Test data ---
const stewardUser = {
  id: 'user-1',
  email: 'steward@sapaa.org',
  user_metadata: { full_name: 'Jane Steward', role: 'steward', avatar_url: '' },
};

const sectionQuestions = [
  {
    id: 37,
    title: 'Date of Your Visit (Q21)',
    text: 'Date of Visit',
    question_type: 'date',
    section: 4,
    answers: [],
    formorder: 8,
    is_required: true,
    sectionTitle: 'Overview of the Visit',
    sectionDescription: 'Details of the visit: Where, When, Who.',
    sectionHeader: 'WhereUGo',
  },
  {
    id: 38,
    title: 'Site Name (Q22)',
    text: 'Select the name of the area visited. If one visit spanned two or more sites, please submit separate site inspections.',
    question_type: 'site_select',
    section: 4,
    answers: [],
    formorder: 9,
    is_required: true,
    sectionTitle: 'Overview of the Visit',
    sectionDescription: 'Details of the visit: Where, When, Who.',
    sectionHeader: 'WhereUGo',
  },
  {
    id: 39,
    title: 'Designated Steward (Q24)',
    text: 'Are you the named, Government of Alberta Steward?',
    question_type: 'option',
    section: 4,
    answers: [
      'Gov. Steward - Individual',
      'Gov. Steward - Group',
      'Level 1/2 SAPAA Volunteer',
      'Citizen Steward',
      'Just Interested',
    ],
    formorder: 11,
    is_required: true,
    sectionTitle: 'Overview of the Visit',
    sectionDescription: 'Details of the visit: Where, When, Who.',
    sectionHeader: 'WhereUGo',
  },
];

// --- Helpers ---
function setupStewardMocks() {
  mockGetUser.mockResolvedValue({ data: { user: stewardUser }, error: null });
  mockIsSteward.mockResolvedValue(true);
  mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
  mockGetCurrentUserUid.mockResolvedValue('user-1');
  mockGetCurrentSiteId.mockResolvedValue('site-1');
}

// --- Tests ---
describe('US 1.0.5 – Add Details Regarding the Overview of my Visit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('user can enter date of visit', async () => {
    mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
    const mockOnChange = jest.fn();
    render(<MainContent responses={{}} onResponsesChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getByText(/Date of Your Visit/i)).toBeInTheDocument();
    });

    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2026-02-12' } });
    
    expect(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0][37]).toBe('2026-02-12');
  });

  it('user can enter which site they are inspecting', async () => {
    mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
    const mockOnChange = jest.fn();
    render(<MainContent responses={{}} onResponsesChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getByText(/Site Name/i)).toBeInTheDocument();
    });

    const siteInput = screen.getByPlaceholderText('Start typing to search for a protected area...');
    fireEvent.change(siteInput, { target: { value: 'Test Site' } });
    
    expect(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0][38]).toBe('Test Site');
  });

  it('user can select their designated steward status', async () => {
    mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
    const mockOnChange = jest.fn();
    render(<MainContent responses={{}} onResponsesChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getByText(/Designated Steward/i)).toBeInTheDocument();
    });

    // Verify all options are available
    expect(screen.getByText('Gov. Steward - Individual')).toBeInTheDocument();
    expect(screen.getByText('Gov. Steward - Group')).toBeInTheDocument();
    expect(screen.getByText('Level 1/2 SAPAA Volunteer')).toBeInTheDocument();
    expect(screen.getByText('Citizen Steward')).toBeInTheDocument();
    expect(screen.getByText('Just Interested')).toBeInTheDocument();

    // Select a steward option
    fireEvent.click(screen.getByText('Citizen Steward'));

    const latestResponses = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
    expect(latestResponses[39]).toBe('Citizen Steward');
  });

  it('user can select only ONE designated steward option (radio button behavior)', async () => {
    mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
    const mockOnChange = jest.fn();
    render(<MainContent responses={{}} onResponsesChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getByText(/Designated Steward/i)).toBeInTheDocument();
    });

    // First selection
    fireEvent.click(screen.getByText('Gov. Steward - Individual'));
    expect(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0][39]).toBe('Gov. Steward - Individual');

    // Second selection - should replace the first
    fireEvent.click(screen.getByText('Just Interested'));
    expect(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0][39]).toBe('Just Interested');
  });

  it('displays all required fields with Required badge', async () => {
    mockGetQuestionsOnline.mockResolvedValue(sectionQuestions);
    render(<MainContent responses={{}} onResponsesChange={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Date of Your Visit/i)).toBeInTheDocument();
    });

    // All 3 questions are required
    const requiredBadges = screen.getAllByText('Required');
    expect(requiredBadges.length).toBe(3);

    // All 3 questions render
    const allQuestionTitles = screen.getAllByRole('heading', { level: 3 });
    expect(allQuestionTitles.length).toBe(3);
  });

  it('footer tracks progress correctly', () => {
    // No responses
    const { unmount } = render(<StickyFooter questions={sectionQuestions} responses={{}} />);
    expect(screen.getByText('0 / 3 answered')).toBeInTheDocument();
    expect(screen.getByText('Review & Submit')).toBeInTheDocument();
    unmount();

    // Partial responses - only count non-empty values
    render(<StickyFooter questions={sectionQuestions} responses={{ 37: '2025-02-12', 38: 'Test Site', 39: '' }} />);
    expect(screen.getByText('2 / 3 answered')).toBeInTheDocument();
  });

  it('allows submission when all required fields are filled', async () => {
    setupStewardMocks();
    mockAddSiteInspectionReport.mockResolvedValue({ id: 'report-123' });
    mockGetQuestionResponseType.mockResolvedValue([
      { question_id: 37, obs_value: 1, obs_comm: 0 },
      { question_id: 38, obs_value: 1, obs_comm: 0 },
      { question_id: 39, obs_value: 1, obs_comm: 0 },
    ]);

    render(<NewReportPage />);

    await waitFor(() => {
      expect(screen.getByText(/Date of Your Visit/i)).toBeInTheDocument();
    });

    // Fill all required fields
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2025-02-12' } });

    const siteInput = screen.getByPlaceholderText('Start typing to search for a protected area...');
    fireEvent.change(siteInput, { target: { value: 'Elk Island National Park' } });

    fireEvent.click(screen.getByText('Citizen Steward'));

    // Submit the form
    const submitButton = screen.getByText('Review & Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddSiteInspectionReport).toHaveBeenCalledWith('site-1', 'user-1');
      expect(mockUploadSiteInspectionAnswers).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ question_id: 37, obs_value: '2025-02-12' }),
          expect.objectContaining({ question_id: 38, obs_value: 'Elk Island National Park' }),
          expect.objectContaining({ question_id: 39, obs_value: 'Citizen Steward' }),
        ])
      );
    });
  });

  it('displays error when submitting without required fields', async () => {
    setupStewardMocks();
    render(<NewReportPage />);

    await waitFor(() => {
      expect(screen.getByText(/Date of Your Visit/i)).toBeInTheDocument();
    });

    // Don't fill any fields, just submit
    const submitButton = screen.getByText('Review & Submit');
    fireEvent.click(submitButton);

    // Should show error popup
    await waitFor(() => {
      expect(screen.getByText(/Required Questions Missing/i)).toBeInTheDocument();
      expect(screen.getByText(/You must answer all required questions/i)).toBeInTheDocument();
    });
  });
});