import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    updateContact,
    setCurrent,
    clearCurrent,
  } = contactContext;
  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              onDelete();
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototype = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
