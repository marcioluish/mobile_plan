import React from 'react';

import classes from './UserDetail.module.css';
import Card from '../UI/Card/Card';

const UserDetail = (props) => {
    console.log(props.userPlan);
    return (
        <div>
            <Card className={classes.user_detail}>
                <h1>Hi {props.user.name}!</h1>
                {!props.userPlan ? (
                    <h2>You have no active plan.</h2>
                ) : (
                    <div>
                        <h2>
                            Your current plan is {props.userPlan.name}. Monthly
                            Cost: ${props.userPlan.price}.
                        </h2>
                        <h3>
                            You have {props.userPlan.dataLimit}GB of data limit
                            and{' '}
                            {!props.userPlan.callLimit
                                ? 'unlimited'
                                : props.userPlan.callLimit + 'min of'}{' '}
                            phone call limit.
                        </h3>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UserDetail;
