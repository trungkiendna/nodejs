import * as React from 'react';
import {Helmet} from 'react-helmet';
import Footer from './Footer';
import axios from 'axios';
 

const Home =() => {
    const [state , setState] = React.useState([]);
React.useEffect(()=> {
    if(state.length == 0){
        axios.get('http://localhost:1337/homes').then(res => {
            setState( res.data[0].image)  
        });  
    }
       
})
    return(
        <div> 
        <Helmet>
                <title>Home</title>
                <meta charSet="utf-8" />
                <meta name="description" content="A React.js application" />
            </Helmet>
        <div className="home">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h1>
                            UI/UX & Graphic Designer
                        </h1>
                        <p>
                            I am a Graphic & Web Designer based in New York, specializing<br/>
                            in User Interface and Development
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="home-body">
            <div className="row">
            {state.map((e,index) => {   
                return(
                    <div
                        key = { index }
                        className="col-xs-3 col-sm-6 col-md-6 col-lg-3 item-bd">
                        <img 
                            src={`http://localhost:1337${e.url}`}/>
                </div>
                )
            })}
            </div>
        </div>
        <Footer/>
    </div>    
    )
}

export default (Home)