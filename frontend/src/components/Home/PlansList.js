import React from 'react';

import Card from '../UI/Card/Card';
import './PlansList.css';

const PlansList = (props) => {
    const activateHandler = (event) => {
        props.onPlanChange(event.target.id);
    };

    return !props.plans ? (
        ''
    ) : (
        <ul className="plans-list">
            {props.plans.map((e) => (
                <li key={e.id} id={e.id}>
                    <Card className="plan-item">
                        <div>
                            <h2>{e.name}</h2>
                            <div className="plan-price">${e.price}</div>
                            <div className="plan-spec">
                                Monthly data limit: {e.dataLimit}GB
                            </div>
                            <div className="plan-spec">
                                Monthly call limit:{' '}
                                {!e.callLimit
                                    ? 'Unlimited'
                                    : e.callLimit + 'min'}
                            </div>
                        </div>
                        <button
                            id={e.id}
                            className="plan-button"
                            onClick={activateHandler}
                        >
                            Activate
                        </button>
                    </Card>
                </li>
            ))}
        </ul>
    );
};

export default PlansList;
