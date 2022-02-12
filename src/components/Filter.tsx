import React, {useRef} from "react";

const Filter: React.FC<any> = (props) => {
  const startDate = useRef<any>();
  const endDate = useRef<any>();
  const status = useRef<any>();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const filters = [];
    if(startDate.current.value) {
      const date = new Date(startDate.current.value);
      filters.push('window_start__gt=' + date.toISOString())
    }
    if(endDate.current.value) {
      const date = new Date(endDate.current.value);
      filters.push('window_start__lt=' + date.toISOString())
    }
    if(status.current.value) {
      filters.push('status=' + status.current.value);
    }
    props.setFilters(filters)
  }

  return (
    <div className="filter-container">
      <form onSubmit={handleOnSubmit} data-testid="filter-form">
        <div className="form-control">
          <label htmlFor="start-date">Date From: </label><br />
          <input data-testid="start-date" ref={startDate} name="start-date" id="start-date" placeholder="Start Date" type="date" />
        </div>
        <div className="form-control">
          <label htmlFor="start-date">Date To: </label><br />
          <input ref={endDate} name="end-date" id="start-date" placeholder="Start Date" type="date" />
        </div>
        <div className="form-control">
          <label htmlFor="status">Status: </label><br />
          <select ref={status} name="status" id="status">
            <option value="">Any</option>
            <option value="3">Successful</option>
            <option value="4">Failed</option>
          </select>
        </div>
        <div className="form-control">
          <button data-testid="submit" type="submit">FILTER</button>
        </div>
      </form>
    </div>
  )
}

export default Filter;