import no_profile_img from '../../../../assets/images/noimg_avatar.png'

import EmailIcon from '../../../../assets/images/email.png'
import PhoneIcon from '../../../../assets/images/phone.png'
import ArrowRightIcon from '../../../../assets/images/arrow_right.png'
import AddressIcon from '../../../../assets/images/address.png'
import { useContext } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'

const Profile = () => {

    const { user } = useContext(AuthContext)

    return ( 
        <>
            <div className="profile">
                <div className="main-card">
                    <img className="profile-pics" src={no_profile_img} alt="" />
                    <div className='main-details'>
                        <p className='user-name'>{user.payload.user.fullName}</p>
                        <p className='id'>{user.payload.user.employeeId}</p>
                    </div>
                </div>

                <div className="detail-card">
                    <img className="img-icon" src={EmailIcon} alt="" />
                    <p className='key'>{user.payload.user.email}</p>
                    {/* <img className="img-icon arrow" src={ArrowRightIcon} alt="" /> */}
                </div>

                <div className="detail-card">
                    <img className="img-icon" src={PhoneIcon} alt="" />
                    <p className='key'>{user.payload.user.phoneNumber}</p>
                    {/* <img className="img-icon arrow" src={ArrowRightIcon} alt="" /> */}
                </div>

                <div className="detail-card">
                    <img className="img-icon" src={AddressIcon} alt="" />
                    <p className='key'>{user.payload.user.address}</p>
                    {/* <img className="img-icon arrow" src={ArrowRightIcon} alt="" /> */}
                </div>
            </div>
        </>
     );
}
 
export default Profile;