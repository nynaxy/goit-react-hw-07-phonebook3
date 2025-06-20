import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import styles from "./Filter.module.css";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={styles.input}
      />
    </label>
  );
};

export default Filter;