export default function DashboardLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3">
          <h4 className="text-center mb-4">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">Dashboard Overview</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Orders</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Wishlist</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Payment & Wallet</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Addresses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Profile Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Notifications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help & Support</a>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
