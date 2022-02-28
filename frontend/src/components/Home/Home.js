import React, { useEffect, useState } from 'react';

import PlansList from './PlansList';
import UserDetail from './UserDetail';
import ErrorAlert from '../UI/ErrorAlert/ErrorAlert';

const Home = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [plans, setPlans] = useState(null);
    const [error, setError] = useState(null);
    const [userPlan, setUserPlan] = useState(null);

    const changeUserPlan = (planId) => {
        fetch('http://localhost:3000/user/' + userData.id, {
            method: 'POST',
            body: JSON.stringify({
                planId: planId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((response) => {
                localStorage.setItem('userData', JSON.stringify(response.user));
                plans.map((e) => {
                    if (e.id === planId) {
                        setUserPlan(e);
                    }
                });
            })
            .catch((err) => {
                setError(
                    err.message ||
                        'Fetching plans data failed - the server responded with an error.'
                );
            });
    };

    useEffect(function () {
        async function fetchPlans() {
            try {
                const response = await fetch('http://localhost:3000/plan', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const resData = await response.json();

                if (!response.ok) {
                    throw new Error(
                        resData.message || 'Fetching plans data failed.'
                    );
                }

                if (userData.planId) {
                    console.log('aqui');
                    console.log(userData.planId);
                    resData.plans.plans.map((e) => {
                        if (e.id === userData.planId) {
                            console.log('aqui 2');
                            setUserPlan(e);
                        }
                    });
                }

                setPlans(resData.plans.plans);
            } catch (err) {
                setError(
                    err.message ||
                        'Fetching plans data failed - the server responded with an error.'
                );
            }
        }

        fetchPlans();
    }, []);

    return (
        <div>
            {error && <ErrorAlert errorText={error} />}
            <UserDetail user={userData} userPlan={userPlan} />
            <PlansList onPlanChange={changeUserPlan} plans={plans} />
        </div>
    );
};

export default Home;
