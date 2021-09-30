import './App.css';
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase'


const App = () => {
  const [user] = useAuthState(auth)
  console.log(user)
  return (
    <div className="App">
      {user ? <Chat /> : <SignIn />}
    </div>
  );
}

export default App;
