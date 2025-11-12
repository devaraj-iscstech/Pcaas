const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have the required permissions to access this page.
        </p>
        <a 
          href="/" 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;