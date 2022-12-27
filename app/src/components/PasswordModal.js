import { useSelector, useDispatch } from 'react-redux';
import { setPassword } from '../slices/passSlice';

export default function PasswordModal(props) {
  const password = useSelector(state => state.password.value);
  const dispatch = useDispatch();

  const onClick = e => {
    dispatch(setPassword(e.target.value));
  };

  const onSubmit = () => {
    props.click && props.click(password);
  };

  return (
    <>
      <div className=" relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden bg-red-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-gradient-to-tl from-yellow-400 to-orange-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-2xl font-medium leading-6 text-gray-200 py-2"
                      id="modal-title"
                    >
                      {props.title}
                    </h3>
                    <input
                      className="text-slate-900 text-2xl px-3 w-full py-2 tracking-wide	"
                      onChange={onClick}
                      type="password"
                      value={password}
                      name="pass"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  ENTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
