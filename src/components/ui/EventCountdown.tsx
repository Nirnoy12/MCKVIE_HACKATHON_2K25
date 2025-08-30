import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";
import styled from "styled-components";

const StyledTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
`;

const EventCountdown = ({ value }: { value: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<any>(null);

  const [tickValue, setTickValue] = useState(value);

  // Make the Tick instance and store it in the refs
  useEffect(() => {
    const didInit = (tick) => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    Tick.DOM.create(currDiv, {
      value,
      didInit
    });
    return () => {
      if (currDiv) {
        Tick.DOM.destroy(currDiv);
      }
    };
  }, [value]);

  // Start the Tick.down process
  useEffect(() => {
    const counter = Tick.count.down(value, {
      format: ["d", "h", "m", "s"]
    });

    // When the counter updates, update React's state value
    counter.onupdate = function (value) {
      setTickValue(value);
    };

    return () => {
      counter.timer.stop();
    };
  }, [value]);

  // When the tickValue is updated, update the Tick.DOM element
  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = {
        days: tickValue[0],
        hours: tickValue[1],
        mins: tickValue[2],
        secs: tickValue[3]
      };
    }
  }, [tickValue]);

  return (
    <div className="tick">
      <div data-repeat="true" data-layout="horizontal fit">
        <div className="tick-group" style={{ fontSize: 24 }}>
          <div ref={divRef} style={{ display: "flex" }}>
            <StyledTimeContainer>
              <div
                data-key="days"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay"
              >
                <span data-view="flip"></span>
              </div>
              <p
                className="tick-text-inline"
                style={{ color: "black", margin: 0, fontSize: 20 }}
              >
                DAY
              </p>
            </StyledTimeContainer>

            <StyledTimeContainer>
              <div
                data-key="hours"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay"
              >
                <span data-view="flip"></span>
              </div>
              <p
                className="tick-text-inline"
                style={{ color: "black", margin: 0, fontSize: 20 }}
              >
                HOUR
              </p>
            </StyledTimeContainer>

            <StyledTimeContainer>
              <div
                data-key="mins"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay"
              >
                <span data-view="flip"></span>
              </div>
              <p
                className="tick-text-inline"
                style={{ color: "black", margin: 0, fontSize: 20 }}
              >
                MIN
              </p>
            </StyledTimeContainer>

            <StyledTimeContainer>
              <div
                data-key="secs"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay"
              >
                <span data-view="flip"></span>
              </div>
              <p
                className="tick-text-inline"
                style={{ color: "black", margin: 0, fontSize: 20 }}
              >
                SEC
              </p>
            </StyledTimeContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCountdown;
