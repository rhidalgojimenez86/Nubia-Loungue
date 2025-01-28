const FlavorCard = ({ flavor, isSelected, onSelect }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="mr-2"
      />
      <div className="flex justify-between items-center">
        <strong className="text-lg">{flavor.name}</strong>
        <span className="text-gray-600">{flavor.price}$</span>
      </div>
      <p className="text-sm text-gray-500">{flavor.description}</p>
    </div>
  );
};

export default FlavorCard;

