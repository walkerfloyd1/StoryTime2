import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div>
            <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-authors" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Author</Link>
        <Link to="/add-books" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Book</Link>
      </div>
        </div>
    )
}

export default DashboardActions