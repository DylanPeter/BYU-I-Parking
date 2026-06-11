import { useState } from "react";
import "./App.css";

import { parkingLots } from "./data/parkingLots";
import type { ParkingLot, Reservation } from "./types/parking";

import CampusMap from "./components/CampusMap";
import PermitFilter from "./components/PermitFilter";
import ParkingLotList from "./components/ParkingLotList";
import ParkingLotDetail from "./components/ParkingLotDetail";
import ReservationConfirmation from "./components/ReservationConfirmation";

function App() {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [startTime, setStartTime] = useState<string>("10:00");
  const [hours, setHours] = useState<number>(1);
  const [selectedPermit, setSelectedPermit] = useState<string>("All");

  const permitOptions = ["All", "Student", "Faculty", "Visitor"];

  const filteredLots =
    selectedPermit === "All"
      ? parkingLots
      : parkingLots.filter((lot) => lot.permitTypes.includes(selectedPermit));

  function reserveLot() {
    if (!selectedLot) return;

    setReservation({
      lot: selectedLot.name,
      startTime,
      duration: hours === 1 ? "1 hour" : `${hours} hours`,
      code: `BYUI-${selectedLot.id}-${Math.floor(Math.random() * 9000 + 1000)}`,
    });
  }

  function resetApp() {
    setSelectedLot(null);
    setReservation(null);
    setStartTime("10:00");
    setHours(1);
  }

  if (reservation) {
    return (
      <ReservationConfirmation
        reservation={reservation}
        hours={hours}
        onReset={resetApp}
      />
    );
  }

  if (selectedLot) {
    return (
      <ParkingLotDetail
        selectedLot={selectedLot}
        startTime={startTime}
        hours={hours}
        onBack={() => setSelectedLot(null)}
        onReserve={reserveLot}
        onStartTimeChange={setStartTime}
        onHoursChange={setHours}
      />
    );
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">BYU-Idaho Transit</p>
        <h1>Find and reserve campus parking.</h1>
        <p>
          Check live availability, reserve a spot, and get a quick confirmation
          pass.
        </p>
      </section>

      <PermitFilter
        selectedPermit={selectedPermit}
        permitOptions={permitOptions}
        onChange={setSelectedPermit}
      />

      <CampusMap lots={filteredLots} onSelectLot={setSelectedLot} />

      <ParkingLotList lots={filteredLots} onSelectLot={setSelectedLot} />
    </main>
  );
}

export default App;