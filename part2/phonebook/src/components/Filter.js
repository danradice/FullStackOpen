const Filter = ({ value, changeHandler }) => {
    return (
    <div>
        filter results by <input
          value={value}
          onChange={changeHandler}
          />
    </div>
    )
}

export default Filter