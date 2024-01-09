'use client';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  AchievementsIcon,
  CollegeFestsIcon,
  EventsIcon,
  OfficialWearIcon,
  PublicityIcon,
  SocialMediaIcon,
} from '../icons';
import { Slide } from 'react-awesome-reveal';

const VertialTimeline = () => {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #00bcd4, #2196f3)', // Gradient from cyan 500 to blue 500
    color: '#fff',
  };
  return (
    <div>
      <VerticalTimeline
        animate={true}
        lineColor="linear-gradient(to bottom, #00bcd4, #2196f3)"
      >
        <Slide>
          <VerticalTimelineElement
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<EventsIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              EVENTS
            </h1>
            <p className="text-justify">
              We organize events such as Bot soccer during fests Bitotsav and
              pantheon. We also organize many technical and educational
              workshops. Through these workshops and events we display and
              promote our sponsors.
            </p>
          </VerticalTimelineElement>
        </Slide>
        <Slide direction="right">
          <VerticalTimelineElement
            position="right"
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<SocialMediaIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              SOCIAL MEDIA
            </h1>

            <p className="text-justify">
              We organize events such as Bot soccer during fests Bitotsav and
              pantheon. We also organize many technical and educational
              workshops. Through these workshops and events we display and
              promote our sponsors.
            </p>
          </VerticalTimelineElement>
        </Slide>
        <Slide>
          <VerticalTimelineElement
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<PublicityIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              PUBLICITY
            </h1>

            <p className="text-justify">
              We promote our sponsors by publicizing them through various
              newsletters, posters, and engaging social media contents. As we
              strive to build a mutually beneficial relationship, we ensure that
              our sponsors receive prominent visibility across our diverse
              channels, allowing their brand to reach a wider audience and
              thrive in the spotlight.
            </p>
          </VerticalTimelineElement>
        </Slide>
        <Slide direction="right">
          <VerticalTimelineElement
            position="right"
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<AchievementsIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              ACHIEVEMENTS
            </h1>

            <p className="text-justify">
              Participated in E-Yantra (organized by IIT BOMBAY) and went up to
              the fourth round. Got First place in Inter college Hack-o-thon. We
              organize programs like SPP(Summer project program) and SMP(student
              Mentorships program) which have filled the CVs of many students.
            </p>
          </VerticalTimelineElement>
        </Slide>
        <Slide>
          <VerticalTimelineElement
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<CollegeFestsIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              COLLEGE FESTS
            </h1>

            <p className="text-justify">
              Our college hosts two major fests, Bitotsav and Pantheon, with
              Bitotsav focusing on culture and the latter on technology. Step
              into a world where not just our own students but also students
              from other colleges converge to make our fests extraordinary. Dive
              into the excitement curated by EEESoc through fun-filled events
              during these celebrations. It's more than just events; it's a
              platform where sponsors and collaborators get the spotlight they
              deserve. Join us in creating experiences that resonate, amplify,
              and leave a lasting impact!
            </p>
          </VerticalTimelineElement>
        </Slide>
        <Slide direction="right">
          <VerticalTimelineElement
            position="right"
            visible={true}
            contentStyle={{ ...gradientStyle }}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            iconStyle={{ ...gradientStyle }}
            icon={<OfficialWearIcon />}
<<<<<<< Updated upstream
=======
            style={{ marginTop: '20px', marginBottom: '20px' }}
>>>>>>> Stashed changes
          >
            <h1 className="vertical-timeline-element-title font-bold text-lg">
              OFFICIAL WEAR
            </h1>

            <p className="text-justify">
              EEESoc team members don their official merchandise during
              competitions, highlighting the contributions of our esteemed
              sponsors and partners.
            </p>
          </VerticalTimelineElement>
        </Slide>
      </VerticalTimeline>
    </div>
  );
};

export default VertialTimeline;
