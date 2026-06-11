type PermitFilterProps = {
  selectedPermit: string;
  permitOptions: string[];
  onChange: (permit: string) => void;
};

export default function PermitFilter({
  selectedPermit,
  permitOptions,
  onChange,
}: PermitFilterProps) {
  return (
    <section className="filter-card">
      <label htmlFor="permit-filter">Permit Type</label>
      <select
        id="permit-filter"
        value={selectedPermit}
        onChange={(e) => onChange(e.target.value)}
      >
        {permitOptions.map((permit) => (
          <option key={permit} value={permit}>
            {permit}
          </option>
        ))}
      </select>
    </section>
  );
}