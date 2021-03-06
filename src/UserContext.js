import React from 'react';

const UserContext = React.createContext();

export class UserProvider extends React.Component {
  state = {
    username: ''
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          username: this.state.username,
          updateUserName: (username) => this.setState({username})
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;
