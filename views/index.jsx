const React = require('react')
const mongoose = require('mongoose');
const Default = require('./layouts/Default')

function Index ({breads, bakers, title})  {
    return (
        <Default>
            <h2>Index Page</h2>
            <h3>Bakers</h3>
            <ul>
                {
                    bakers.map((baker) => {
                        return(
                            <li key={baker._id}>
                                <a href={`/bakers/${baker._id}`}>{baker.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <h3>Breads</h3>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (
                        <li key={bread._id}> 
                            <a href={`/breads/${bread._id}`}> 
                                {bread.name} 
                                </a>
                        </li>)
                    })
                }
            </ul>
                {/* This is a JSX comment. */}
                {/* <p>I have {breads[0].name} bread!</p> */} 
        </Default>
      
    )
}


module.exports = Index
