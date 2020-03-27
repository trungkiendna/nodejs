import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './components/Home';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import NotFoundPage from './components/NotFoundPage';
import Project from './components/Project';



interface AppProps {
    /** */
}

export const App = (props: AppProps) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path="/"
                            exact component={Home} />
                        <Route exact path="/about" 
                                render={props => <About {...props}/>}
                            />
                        <Route exact path="/contact" 
                                render={props => <Contact {...props}/>}
                            />
                        <Route exact path="/single-page"
                                render={() => <Project/>}
                            />    
                        <Route path="*"
                                render={() =>  <NotFoundPage/>}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
        
    );
}