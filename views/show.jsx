const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
    //Confirm we are getting our bread data in the terminal
    //console.log(bread.name)
    return (
      <Default>
        <h2>Show Page</h2>
        <h3>{bread.name}</h3>
        
        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
            <input type='submit' value="DELETE"/>
        </form>

        <p>and it
            {
                bread.hasGluten
                ? <span> does </span>
                : <span> does Not </span>
            }
            have gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        {/* Find where we wrote 'Baked by []' and replace that text with the call to the bakedBy method on bread */}
        <p>{bread.getBakedBy()}</p>
		{/* <p>Baked by {bread.baker}</p> */}
        <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
        <li><a href="/breads">Go home</a></li>
      </Default>
    )
}

module.exports = Show