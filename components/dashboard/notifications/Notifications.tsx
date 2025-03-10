const Notifications = () => {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
        <ul>
          {[{ id: 1, message: "Your booking for 'Nomadic Spirit' has been confirmed!" }].map((notification) => (
            <li key={notification.id} className="border-b py-3">
              <span className="text-gray-800">{notification.message}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  };
  
  export default Notifications;
  