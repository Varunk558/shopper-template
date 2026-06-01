import React, {useContext, useState} from 'react';

let UserDetailsContext = React.createContext(null);

export function MensClothing() {
    const userDetails = useContext(UserDetailsContext);
    return (
        <div className="bg-warning p-4">
            <h2>Mens Clothing - {userDetails.Email}</h2>
        </div>
    );
}

export function HomeComponent() {

    const userDetails = useContext(UserDetailsContext);
    return (
        <div className="bg-light text-dark p-3">
            <h2>Child Component - {userDetails.UserName}</h2>
            <MensClothing />
        </div>
    );
}

export function ContextDemo() {

    const [userName, setUserName] = useState("");

    function handleInputChange(event) {
        setUserName(event.target.value);
    }

    return (
        <div className=" container-fluid bg-dark text-white p-3" style={{height: "300px"}}>
            <h2>Main Component</h2>
            <dl>
                <dt>UserName</dt>
                <dd><input type='text' value={userName} onChange={handleInputChange} /></dd>
            </dl>
            <UserDetailsContext.Provider value={{UserName: userName, Email: `${userName}@gmail.com`}}>
                <HomeComponent />
            </UserDetailsContext.Provider>
        </div>
    );
}