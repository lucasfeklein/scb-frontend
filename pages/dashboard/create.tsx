import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import { useState } from 'react';

function CreateChatbot() {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the url value, such as submitting a form
    setUrl('')
    console.log(url);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-4">Digite sua URL</h2>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/"
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-r-md"
          >
            Enviar
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateChatbot;
