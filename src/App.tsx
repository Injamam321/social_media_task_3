import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { UserList } from "./components/UserListProps";
import { Feed } from "./components/Feed";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const handleHeaderClick = () => {
    setSearchQuery('');
  }
  return (
    <div className="min-h-screen bg-light">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onHeaderClick={handleHeaderClick} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-4">
            <UserList
              selectedUser={selectedUser}
              onUserSelect={setSelectedUser}
              onFriendSelect={setSelectedFriend}
            />
          </div>
          <div className="col-md-9 p-4">
            <Feed
              searchQuery={searchQuery}
              selectedUser={selectedUser}
              selectedFriend={selectedFriend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
