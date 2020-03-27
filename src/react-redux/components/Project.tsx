import * as React from 'react';
import Footer from './Footer';
import * as moment from 'moment';
import { Helmet } from 'react-helmet';



const Project  = ({}) => {
    const [persons, setPersons] = React.useState([]);
    const [number, setNumber] = React.useState(0);
    React.useEffect(() => {
        if (persons.length <= 0) {
            fetch("http://localhost:1337/prjcts")
                .then(res => res.json())
                .then(
                    (result) => {
                        setPersons(result)
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    })
    if (persons.length > 0) {
        return (
            <>  
            <div>
                 <Helmet>
                        <title>Project</title>
                        <meta charSet="utf-8" />
                        <meta name="description" content="A React.js application" />
                    </Helmet>
                <div className="container-fluid pj-body">
                    <div className="row pj-img">
                             <div className="col">
                                 <div style={{ 
                                         backgroundImage: `url('http://localhost:1337${persons[number].desc.image.url}')`  
                             }}
                                     className={'pj-content__fake-img'}>
                                 </div>
                             </div>
                    </div>
                    {/* /// */}
                    <div className="container">
                                <div className="row">   
                                    <div className="col-xs-6">
                                
                                                    <h1>{persons[number].title}</h1>
                                            <p>
                                                {persons[number].desc.text1}<br/>
                                                {persons[number].desc.text2}<br/>
                                                {persons[number].desc.text3}<br/>
                                                {persons[number].desc.text4}<br/>
                                                <br/>
                                                {persons[number].desc.text5}<br/>
                                                {persons[number].desc.text6}<br/>
                                            </p>
                                            <div className="client">
                                                <span><b>Client: </b> {persons[number].client.name}</span>  
                                                <span><b>Date: </b>  {moment(persons[number].client.created_at).format('DD/MM/YYYY')}</span>
                                                <span><b>Share: </b>  {persons[number].client.share}</span>
                                            </div>
                                                </div>
                    
                                            
                                </div>
                            </div>
                            {/* ////// */}
                </div>
                {/* ///////// */}
                <div className="pj-footer">
                        <div 
                            onClick={() => {
                                if (number != 0) {
                                    setNumber(number - 1)
                                } else {
                                    setNumber(persons.length - 1)
                                }
                            }} className="pre-pj">
                            <a>
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;
                                <b>PREVIOUS PROJECT</b>
                            </a>
                    
                        </div>

                        <div className="touch">
                            <a href="#">
                                <i className="fa fa-windows"></i>
                            </a>
                        </div>

                        <div 
                            onClick={() => {
                                if (number < persons.length - 1) {
                                    setNumber(number + 1)
                                } else {
                                    setNumber(0)
                                }
                            }} className="next-pj">
                            <a>
                                <b>NEXT PROJECT</b>&nbsp;
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </a>
                
                        </div>
                    </div>
                    <Footer />
                             
                </div>
            </>
        )
    }
    else {
        return (null)
    }

}



export default Project