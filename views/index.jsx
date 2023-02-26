const React = require('react')
const mongoose = require('mongoose');
const Default = require('./layouts/Default')

function Index ({breads})  {
    return (
        <Default>
            <h2>Index Page</h2>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (
                        <li key={index}> 
                            <a href={`/breads/${index}`}> 
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
