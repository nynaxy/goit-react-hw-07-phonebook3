import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const validateName = (name) => {
    const nameParts = name.trim().split(" ");
    return (
      nameParts.length >= 2 &&
      nameParts.every((part) => /^[A-Za-z]+$/.test(part))
    );
  };

  const validateNumber = (number) => {
    return /^[0-9-]+$/.test(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name =
        "Name must contain first and last name, only letters are allowed.";
    }
    if (!validateNumber(number)) {
      newErrors.number = "Number can only contain digits and hyphens.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, phone: number }));
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>
      <label className={styles.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.number && <p className={styles.error}>{errors.number}</p>}
      </label>
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;