import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const emptyMessage = await screen.findByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('should calculate and display correct stats', async () => {
  const testQueryClient = createTestQueryClient();
  
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for stats to appear
  await waitFor(() => {
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });
  
  // Then check the second stat
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('should delete todo when delete button clicked', async () => {
  const testQueryClient = createTestQueryClient();
  
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const deleteButton = await screen.findByLabelText('delete');
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({}),
  });
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display error message when API fails', async () => {
  const testQueryClient = createTestQueryClient();
  
  global.fetch.mockRejectedValueOnce(new Error('API Error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const errorMessage = await screen.findByText(/error loading todos/i);
  expect(errorMessage).toBeInTheDocument();
});

test('should use relative API URL', () => {
  // This test verifies that the API_URL is relative, not hardcoded to localhost
  const appCode = require('fs').readFileSync(
    require('path').resolve(__dirname, '../App.js'),
    'utf8'
  );
  
  expect(appCode).not.toContain('http://localhost:3001');
  expect(appCode).toContain('/api/todos');
});

afterEach(() => {
  jest.clearAllMocks();
});
