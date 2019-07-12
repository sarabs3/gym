import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { List, Typography, Row, Col } from 'antd';
import { DateInList } from '../../components/dateInList';

const exerciesName = {
    0: 'Lower Body Pull',
    1: 'Uper Body Push',
    2: 'Lower Body Push',
    3: 'Uper Body Pull',
    4: 'Metabolic Conditioning Workouts',
    5: 'Rest',
    6: 'Rest',
    7: 'Obliques',
};
const weeks = {
    0: [
        { exercise: 'Deadlift', id: 1, set: 'Sets 5 Reps 5 Rest 2-3 minutes', desc: 'Grip the bar with your hands shoulder-width apart, with your arms straight and knees slightly bent. Keeping your chest up and your back straight, drive down through your heels and pull the bar up your legs, pushing your hips forwards to stand tall.' },
        { exercise: 'Compact kettlebell swing', id: 2, set: 'Sets 3 Reps 15-20 Rest 60-90 seconds', desc: '' },
        { exercise: 'Good morning', id: 3, set: 'Sets 4 Reps 8 Rest 60-90 seconds', desc: '' },
        { exercise: 'Hollow rock', id: 4, set: 'Sets 3 Time 30 seconds Rest 60-90 seconds', desc: '' },
    ],
    1: [
        { exercise: 'Wide-grip bench press', id: 1, set: 'Sets 3 Reps 8 Rest 2-3 minutes', desc: '', image: 'https://cdn2.coachmag.co.uk/sites/coachmag/files/styles/insert_main_wide_image/public/2016/02/2.1.jpg?itok=MsRr3eqG' },
        { exercise: 'Close-grip bench press', id: 2, set: 'Sets 3 Reps 8 Rest 60-90 seconds', desc: '', image: 'https://cdn1.coachmag.co.uk/sites/coachmag/files/styles/insert_main_wide_image/public/2016/02/2.2.jpg?itok=48T3dI5y' },
        { exercise: 'Military press', id: 3, set: 'Sets 4 Reps 8 Rest 60-90 seconds', desc: '' },
        { exercise: 'Dips', id: 4, set: 'Sets 4 Reps 8-12 Rest 60-90 seconds', desc: '' },
        { exercise: 'Finisher: 10min AMRAP', id: 5, set: 'Hang power clean: Reps 10 && Burpee over bar: Reps 10', desc: '' },
    ],
    2: [
        { exercise: 'Front squat', id: 1, set: 'Sets 5 Reps 5 Rest 2-3 minutes', desc: '' },
        { exercise: 'Barbell lunge', id: 2, set: 'Sets 3 Reps 10 Rest 2-3 minutes', desc: '' },
        { exercise: 'Bench pistol squat', id: 3, set: 'Sets 3 Reps 6 each side Rest 60-90 seconds', desc: '' },
        { exercise: 'Turkish get-up', id: 4, set: 'Sets 3 Reps 3 each side Rest 60-90 seconds', desc: '' },
    ],
    3: [
        { exercise: 'Power snatch', id: 1, set: 'Sets 3 Reps 3 Rest 2-3 minutes', desc: '' },
        { exercise: 'Pull-up', id: 2, set: 'Sets 4 Reps 10 Rest 60-90 seconds', desc: '' },
        { exercise: 'Pendlay row', id: 3, set: 'Sets 4 Reps 10 Rest 60-90 seconds', desc: '' },
        { exercise: 'Kettlebell clean and press', id: 4, set: 'Sets 3 Reps 10 Rest 60-90 seconds', desc: '' },
        { exercise: 'Finisher: 3 RFT', id: 5, set: 'Thruster: Reps 21/15/9 && Jump over bench: Reps 21/15/9', desc: 'Do 21 thrusters, then 21 reps jumping over the bench. Next do 15 reps of each, then nine. Race the clock and rest as needed.' },
    ],
    4: [
        { exercise: 'EMOM (every minute on the minute)', id: 1, set: 'Do a set number of reps at regular intervals on a running clock, usually every minute, on the minute. This tests your powers of recovery.  &&      Do it Three clean and jerks every minute for ten minutes', desc: '' },
        { exercise: 'AMRAP (as many reps as possible)', id: 2, set: 'Complete as many rounds as possible of a given exercise combination within a given time. It builds stamina and burns fat.  &&      Do it 12 minutes of eight front squats and eight push presses', desc: '' },
        { exercise: 'RFT (rounds for time)', id: 3, set: 'Complete a given number of rounds of a circuit as fast as possible. Short rest periods develop long-lasting muscle endurance.  &&      Do it Eight rounds of 15 kettlebell swings, ten KB clean and presses and five KB snatches', desc: '' },
        { exercise: 'Chipper', id: 4, set: 'A series of exercises, usually high reps. Complete one round for time. A high-volume, muscle building grind.   &&     Do it 100 press-ups, 75 bodyweight squats, 50 burpees, 25 pull-ups', desc: '' },
        { exercise: 'Ladder', id: 4, set: 'One or more movements, increasing or decreasing workload over time. Build intensity for a challenging warm-up.   &&     Do it One to ten reps of goblet squats alternating with ten to one reps of pull-ups', desc: '' },
        { exercise: 'Tabata', id: 4, set: 'Do eight rounds of high-intensity intervals, alternating 20 seconds’ effort with ten seconds’ rest. A real fat-eviscerating finisher.   &&    Do it: Row for max distance', desc: '' },
    ],
    7: [
        { exercise: 'Side planks', id: 1, set: '', desc: '' },
        { exercise: 'Single Leg Side Planks', id: 2, set: '', desc: '' },
        { exercise: 'Side plank dips', id: 3, set: '', desc: '' },
        { exercise: 'Russian Twist', id: 4, set: '', desc: '' },
        { exercise: 'Spiderman Plank', id: 5, set: '', desc: '' },
        { exercise: 'T-Rotation', id: 6, set: '', desc: '' },
        { exercise: 'Bird Dog Crunch', id: 7, set: '', desc: '' },
        { exercise: 'Medicine Ball Wall Ball', id: 8, set: '', desc: '' },
        { exercise: 'Side Bends', id: 9, set: '', desc: '' },
        { exercise: 'Standing Side Crunch', id: 10, set: '', desc: '' },
        { exercise: 'Sitting Side crunch', id: 11, set: '', desc: '' },
        { exercise: 'Single Arm Farmers Carry', id: 12, set: '', desc: '' },
        { exercise: 'Hanging Hurdle', id: 13, set: '', desc: '' },
        { exercise: 'Hanging Oblique Raise', id: 14, set: '', desc: '' },
        { exercise: 'Half kneeling cable chops', id: 15, set: '', desc: '' },
    ],
};

const ExerciseList = ({ params = {} }) => (
    <div className="exercies">
        <Row>
            <Col span={24}>
                <h4>{exerciesName[params.id]}</h4>
                <List
                    dataSource={weeks[params.id]}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.exercise}
                                description={item.set}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    </div>
);

const Exercise = ({ match = {} }) => (
    <Fragment>
        <ExerciseList params={match.params} />
    </Fragment>
);

export default Exercise;
