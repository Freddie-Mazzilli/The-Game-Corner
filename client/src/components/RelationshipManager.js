import React, {useState, useEffect} from "react";
import Relationship from "./Relationship";

function RelationshipManager({relationshipButton}) {

    const [relationships, setRelationships] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:7000/geedees')
        .then(res => res.json())
        .then(relationshipData => setRelationships(relationshipData))
    }, [])

    const relationship = relationships.map(relationship => {
        return <Relationship key={relationship.id} relationship={relationship}/>
    })

    return(
        <>
            <div className="user-input">
                <button onClick={relationshipButton} className="login-button">Add Relationship</button>
            </div>
            <div className="relationship-grid">
                {relationship}
            </div>
        </>
    )
}

export default RelationshipManager