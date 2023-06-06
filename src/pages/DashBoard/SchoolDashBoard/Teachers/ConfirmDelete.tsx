const ConfirmDelete = () => {
  return (
    <div>
      <h1 className="font-bold text-[30px] mt-8 text-center">
        Are you sure you want to delete this profile
      </h1>
      <p className="text-center mb-10 ">
        If you delete this profile you can't rcover it
      </p>

      <div className="flex justify-end gap-4 ">
        <button className="p-4 px-10 bg-red-200 text-red-600 rounded-full flex-grow">
          Cancel
        </button>
        <button className="p-4 px-10 bg-red-600 text-white rounded-full flex-grow">
          Remove
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
