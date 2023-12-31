import React from "react";

export const AddToDoItem = () => {
  return (
    <div>
      <form className="row row-cols-lg-auto g-3 align-items-center">
        <div className="col-12">
          <label
            className="visually-hidden"
            htmlFor="inlineFormInputGroupUsername"
          >
            Username
          </label>
          <div className="input-group">
            <div className="input-group-text">todo</div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Task name"
            />
          </div>
        </div>

        <div className="col-12">
          <label className="visually-hidden" htmlFor="inlineFormSelectPref">
            Preference
          </label>
          <select className="form-select" id="inlineFormSelectPref">
            <option value="" disabled selected>
              Select Priority
            </option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div className="col-12">
          <label
            className="visually-hidden"
            htmlFor="inlineFormInputGroupUsername"
          >
            Discription
          </label>
          <div className="input-group">
            <div className="input-group-text">Discreption</div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="description"
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
