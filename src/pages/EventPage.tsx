import React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { CommandBarEvent } from '../components/CommandBar/CommandBarEvent';
import { EventStore } from '../stores/EventStore';
import { useParams } from 'react-router-dom';
import { AddCard } from '../components/Cards/AddCard/AddCard';
import { TaskCard } from '../components/Cards/TaskCard/TaskCard';
import { Task } from '../models/Task';
import { Subtask } from '../models/Subtask';
import { GuideCard } from '../components/Cards/GuideCard/GuideCard';
import { Guide } from '../models/Guide';

export interface IEventProps {
    eventStore: EventStore;
}

export const EventPage = observer((props: IEventProps) => {
    const { eventStore } = props;
    const { id } = useParams();

    const event = eventStore.findEvent(+id);
    const add = () => {

    };

    if (!event) {
        return null;
    }
    const task = new Task(
        {
            id: 0,
            isMain: true,
            isEnabled: true,
            subtasks: [
                new Subtask(
                    {
                        id: 0,
                        title: "Visai komandai nusifotografuoti pašokus ore",
                        points: 10,
                        isTimed: false
                    }),
                new Subtask(
                    {
                        id: 1,
                        title: "Visai komandai nusifotografuoti pašokus oreaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        points: 5,
                        isTimed: false
                    })
            ]
        });
    const guide = new Guide({
        id: 0,
        name: "Vardenis",
        email: "vadenis@email.com"
    });
    const { state, title } = event;

    return (
        <div>
            <CommandBarEvent eventState={state} eventTitle={title} />
            <div>
                <AddCard title="Add main task" addFunction={add} />
                <TaskCard task={task} />
                <GuideCard guide={guide} />
            </div>
        </div >
    );
});