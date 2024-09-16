/* eslint-disable react/prop-types */
import logo from '../assets/img/TECHLOGIX.svg'

export const Logo = ({text}) => {
    return(
        <div className='container-img'>
            <img  src={logo} alt="logo"/>
            <span>{text}</span>
        </div>
    )
}