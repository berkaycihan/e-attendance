import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {UserProvider} from "./context";

ReactDOM.render(
<UserProvider>
<App />
</UserProvider>

,
 document.getElementById('root'));
registerServiceWorker();
