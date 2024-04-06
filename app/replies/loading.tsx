export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="  shadow rounded-md space-y-5 p-4  mx-auto mb-6">
        {[...Array(4)].map((_, rowIndex) => (
          <div key={rowIndex} className="animate-pulse mb-4">
            <div className="flex space-x-4 mx-auto  w-full">
              {[...Array(4)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-40 h-11  bg-gray-300 rounded "
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
