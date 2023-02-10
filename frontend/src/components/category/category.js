import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, deleteCategory, updateCategory } from '../../actions/categoryAction'

import "./category.css"

const Category = () => {
  const [name, setName] = useState('')
  const [edit, setEdit] = useState(null)

  const categories = useSelector((state) => state.category)
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    if(edit) setName(edit.name)
  },[edit])

  const handleSubmit = (e) => {
    e.preventDefault()
    //if (!user?.role !== "admin" || !name) return;

    if(edit){
      if(edit.name === name) return;
      const data = {...edit, name}
      dispatch(updateCategory(data))
    }else{
      dispatch(createCategory(name))
    }
    setName('')
    setEdit(null)
  }


  const handleDelete = (id) => {
    //if(!user?.role !== 'admin') return;
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  }
  const empty = () => {
    setEdit(null)
    setName("")
}

  //if(user?.role !== 'admin') return <NotFound />
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>

        <div className="">
          {edit && (
            <i
              className="fa fa-trash-o"
              style={{ cursor: "pointer",color:"red",fontSize:"18px" }}
              onClick={empty}
            />
          )}
          <input
            style={{fontSize:"20px"}}
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>

      <div>
        {categories &&
          categories?.map((category) => (
            <div className="category_row" key={category._id}>
              <p>{category.name}</p>

              <div>
                <i className="fa fa-pencil-square-o" onClick={() => setEdit(category)} />
                <i
                  className="fa fa-trash-o"
                  onClick={() => handleDelete(category._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Category
