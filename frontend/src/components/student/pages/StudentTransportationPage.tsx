import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  X,
  Send,
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { TRANSPORT_ROUTES } from '../../../data/studentMockData';
import { TransportRouteItem } from '../../../types/student';

interface AppliedTransport {
  applicationNo: string;
  academicYear: string;
  routeNo: string;
  routeName: string;
  pickupStop: string;
  feeAmount: number;
  driverName: string;
  driverPhone: string;
  appliedDate: string;
  status: 'Approved' | 'Pending Review' | 'Cancelled';
}

export const StudentTransportationPage: React.FC = () => {
  const { activeSubmenu, navigate, profile } = useStudent();

  // Active view: either 'application-request' (Page 33) or 'route-change' (Page 34)
  const currentTab = activeSubmenu === 'route-change' ? 'route-change' : 'application-request';

  // State for active transportation
  const [appliedTransport, setAppliedTransport] = useState<AppliedTransport | null>(null);

  // Modals state
  const [showRoutesModal, setShowRoutesModal] = useState<boolean>(false);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [showChangeRouteModal, setShowChangeRouteModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [selectedRouteForView, setSelectedRouteForView] = useState<TransportRouteItem | null>(TRANSPORT_ROUTES[0]);

  // Form states
  const [selectedRouteId, setSelectedRouteId] = useState<string>(TRANSPORT_ROUTES[0].routeNo);
  const [selectedStop, setSelectedStop] = useState<string>(TRANSPORT_ROUTES[0].stops[0].stopName);
  const [emergencyPhone, setEmergencyPhone] = useState<string>(profile.mobileNumber);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Route change form states
  const [newRouteId, setNewRouteId] = useState<string>(TRANSPORT_ROUTES[1]?.routeNo || TRANSPORT_ROUTES[0].routeNo);
  const [newStop, setNewStop] = useState<string>('');
  const [changeReason, setChangeReason] = useState<string>('');

  // Cancel form states
  const [cancelReason, setCancelReason] = useState<string>('');

  const selectedRouteObj = TRANSPORT_ROUTES.find((r) => r.routeNo === selectedRouteId) || TRANSPORT_ROUTES[0];
  const newRouteObj = TRANSPORT_ROUTES.find((r) => r.routeNo === newRouteId) || TRANSPORT_ROUTES[0];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please accept the transportation rules and regulations before submitting.');
      return;
    }

    const newApp: AppliedTransport = {
      applicationNo: `TR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      academicYear: '2026 - 2027',
      routeNo: selectedRouteObj.routeNo,
      routeName: selectedRouteObj.routeName,
      pickupStop: selectedStop,
      feeAmount: selectedRouteObj.feePerYear,
      driverName: selectedRouteObj.driverName,
      driverPhone: selectedRouteObj.contactNumber,
      appliedDate: new Date().toLocaleDateString('en-GB'),
      status: 'Approved',
    };

    setAppliedTransport(newApp);
    setShowApplyModal(false);
    setSuccessToast(`Transport Application ${newApp.applicationNo} submitted & confirmed successfully!`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const handleChangeRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appliedTransport) return;

    setAppliedTransport({
      ...appliedTransport,
      routeNo: newRouteObj.routeNo,
      routeName: newRouteObj.routeName,
      pickupStop: newStop || newRouteObj.stops[0].stopName,
      driverName: newRouteObj.driverName,
      driverPhone: newRouteObj.contactNumber,
      status: 'Approved',
    });

    setShowChangeRouteModal(false);
    setSuccessToast('Route modification request approved and bus pass updated!');
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedTransport(null);
    setShowCancelModal(false);
    setSuccessToast('Transportation pass cancelled successfully. Refund initiated.');
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between text-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span className="font-medium">{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-emerald-200 hover:text-white ml-4 font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}

      {/* Breadcrumb & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            TRANSPORTATION MANAGEMENT &gt;{' '}
            {currentTab === 'application-request'
              ? 'APPLICATION REQUEST'
              : 'ROUTE CHANGE / CANCELLATION REQUEST'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentTab === 'application-request'
              ? 'Transportation Application'
              : 'Cancellation / Modification Request'}
          </h1>
        </div>

        {/* Tab switchers matching PDF pages 33 & 34 */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => navigate('transport', 'application-request')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              currentTab === 'application-request'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Bus className="w-4 h-4" />
            Application Request
          </button>
          <button
            onClick={() => navigate('transport', 'route-change')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              currentTab === 'route-change'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Route Change / Cancellation
          </button>
        </div>
      </div>

      {/* TAB 1: APPLICATION REQUEST (Page 33) */}
      {currentTab === 'application-request' && (
        <div className="space-y-6">
          {/* Main Available Application Card (Exact reproduction of Page 33) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-purple-600/60 px-2.5 py-0.5 rounded-full text-purple-200">
                  Available Application
                </span>
                <h2 className="text-lg font-bold mt-1">
                  Transport Application For The Academic Year 2026 - 2027
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Applications Open
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Adichunchanagiri University provides dedicated, air-conditioned and standard bus fleet
                    transportation services covering major corridors in Bangalore, Mysore, Mandya,
                    Channarayapatna, Kunigal, Hassan, and Bellur Cross for regular commuting students and staff.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="text-xs font-medium text-gray-500">Service Coverage</div>
                      <div className="text-sm font-semibold text-gray-800 mt-1">12 Dedicated University Routes</div>
                      <div className="text-xs text-gray-500 mt-0.5">GPS Tracking & Speed Controlled</div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="text-xs font-medium text-gray-500">Academic Term</div>
                      <div className="text-sm font-semibold text-gray-800 mt-1">Annual Pass (Odd + Even Sems)</div>
                      <div className="text-xs text-gray-500 mt-0.5">Valid until 30 June 2027</div>
                    </div>
                  </div>

                  {/* Highlights / Important notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 space-y-1">
                      <div className="font-semibold text-amber-900">Transportation Instructions:</div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li>Passes are strictly non-transferable and must be presented to the bus marshal upon boarding.</li>
                        <li>Seats are allocated on a first-come, first-served basis per route capacity.</li>
                        <li>Fee payment can be completed online or integrated directly with the annual tuition fee challan.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action card */}
                <div className="bg-purple-50 rounded-xl p-5 border border-purple-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-purple-900 font-semibold text-base mb-2">
                      <Bus className="w-5 h-5 text-purple-700" />
                      Transport Pass Status
                    </div>
                    {appliedTransport ? (
                      <div className="space-y-3 mt-4">
                        <div className="p-3 bg-white rounded-lg border border-purple-200 text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pass No:</span>
                            <span className="font-semibold text-gray-800">{appliedTransport.applicationNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Route:</span>
                            <span className="font-semibold text-purple-700">{appliedTransport.routeNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pickup:</span>
                            <span className="font-semibold text-gray-800">{appliedTransport.pickupStop}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className="font-semibold text-emerald-600">{appliedTransport.status}</span>
                          </div>
                        </div>
                        <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          You have an active bus pass for 2026-27.
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-600 mt-2 space-y-2">
                        <p>No active transport subscription found for this academic session.</p>
                        <p className="text-purple-800 font-medium">Click below to review bus routes and apply immediately.</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5 mt-6">
                    <button
                      onClick={() => setShowRoutesModal(true)}
                      className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-purple-700 border border-purple-300 font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-purple-600" />
                      Bus Routes & Timings
                    </button>

                    {!appliedTransport ? (
                      <button
                        onClick={() => setShowApplyModal(true)}
                        className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Apply for Transportation
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('transport', 'route-change')}
                        className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Manage / Change Route
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Routes Quick Grid */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Bus className="w-5 h-5 text-purple-700" />
                Featured University Shuttle Routes (2026 - 2027)
              </h3>
              <span className="text-xs text-gray-500 font-medium">All buses air-conditioned & Wi-Fi enabled</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRANSPORT_ROUTES.map((route) => (
                <div
                  key={route.routeNo}
                  className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-purple-50/20"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                        {route.routeNo}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1.5">{route.routeName}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Annual Fee</div>
                      <div className="text-sm font-bold text-purple-700">₹{route.feePerYear.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    <span className="font-semibold text-gray-700">Via: </span>
                    {route.via}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{route.driverName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{route.contactNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2">
                    <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                      {route.availableSeats} Seats Available
                    </span>
                    <button
                      onClick={() => {
                        setSelectedRouteForView(route);
                        setShowRoutesModal(true);
                      }}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                    >
                      View All Stops
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROUTE CHANGE / CANCELLATION REQUEST (Page 34) */}
      {currentTab === 'route-change' && (
        <div className="space-y-6">
          {!appliedTransport ? (
            /* EXACT REPRODUCTION OF EMPTY STATE IN PAGE 34 */
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border-2 border-dashed border-purple-200">
                  <Bus className="w-10 h-10" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">No Application Found</h3>

                {/* EXACT TEXT FROM PAGE 34 */}
                <p className="text-sm text-gray-600">
                  You are not availed for the transportation service.
                </p>

                <p className="text-xs text-gray-500">
                  To request a route change, bus stop modification, or cancellation, you must first have an active
                  transportation enrollment for the academic year 2026 - 2027.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('transport', 'application-request')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Bus className="w-4 h-4" />
                    Apply for Transportation Now
                  </button>
                  <button
                    onClick={() => setShowRoutesModal(true)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Explore Routes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE PASS DISPLAY WITH CHANGE / CANCEL CONTROLS */
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Bus className="w-6 h-6 text-purple-200" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-200 uppercase font-semibold">Active University Pass</div>
                      <h2 className="text-lg font-bold">Academic Year 2026 - 2027</h2>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold">
                    Active & Valid
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                      <div className="text-xs text-gray-500">Pass Number</div>
                      <div className="text-base font-bold text-purple-900 mt-1">{appliedTransport.applicationNo}</div>
                      <div className="text-xs text-gray-500 mt-1">Student: {profile.fullName}</div>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                      <div className="text-xs text-gray-500">Assigned Route</div>
                      <div className="text-base font-bold text-gray-900 mt-1">{appliedTransport.routeNo}</div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-1">{appliedTransport.routeName}</div>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                      <div className="text-xs text-gray-500">Designated Stop</div>
                      <div className="text-base font-bold text-gray-900 mt-1">{appliedTransport.pickupStop}</div>
                      <div className="text-xs text-emerald-600 mt-1 font-semibold">Pickup: 07:15 AM</div>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                      <div className="text-xs text-gray-500">Annual Charge Paid</div>
                      <div className="text-base font-bold text-gray-900 mt-1">
                        ₹{appliedTransport.feeAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Driver: {appliedTransport.driverName}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowChangeRouteModal(true)}
                      className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Request Route Change
                    </button>
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      Request Service Cancellation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: BUS ROUTES & STOPS MODAL */}
      {showRoutesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-200 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-purple-200" />
                <h3 className="font-bold text-lg">ACU University Bus Routes & Stops</h3>
              </div>
              <button
                onClick={() => setShowRoutesModal(false)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Route Selector Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                {TRANSPORT_ROUTES.map((route) => (
                  <button
                    key={route.routeNo}
                    onClick={() => setSelectedRouteForView(route)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      selectedRouteForView?.routeNo === route.routeNo
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    {route.routeNo}: {route.routeName.split('(')[0]}
                  </button>
                ))}
              </div>

              {selectedRouteForView && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-purple-50 p-4 rounded-xl border border-purple-200 gap-3">
                    <div>
                      <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                        {selectedRouteForView.routeNo}
                      </div>
                      <h4 className="text-base font-bold text-gray-900">{selectedRouteForView.routeName}</h4>
                      <p className="text-xs text-gray-600 mt-1 font-medium">{selectedRouteForView.via}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Annual Fee</div>
                      <div className="text-lg font-bold text-purple-800">
                        ₹{selectedRouteForView.feePerYear.toLocaleString()}
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold">
                        {selectedRouteForView.availableSeats} of {selectedRouteForView.totalSeats} seats open
                      </div>
                    </div>
                  </div>

                  {/* Stops Timeline */}
                  <div>
                    <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                      Designated Bus Stops & Timings
                    </h5>
                    <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
                      <div className="bg-gray-50 px-4 py-2.5 grid grid-cols-12 text-xs font-bold text-gray-600 uppercase">
                        <span className="col-span-1">#</span>
                        <span className="col-span-6">Stop Name</span>
                        <span className="col-span-2 text-center">Morning Pickup</span>
                        <span className="col-span-3 text-center">Evening Drop</span>
                      </div>
                      {selectedRouteForView.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-3 grid grid-cols-12 text-xs items-center hover:bg-purple-50/40 transition-colors"
                        >
                          <span className="col-span-1 font-bold text-purple-700">{idx + 1}</span>
                          <span className="col-span-6 font-semibold text-gray-800 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            {stop.stopName}
                          </span>
                          <span className="col-span-2 text-center font-medium text-emerald-700 bg-emerald-50 py-1 rounded">
                            {stop.morningPickup}
                          </span>
                          <span className="col-span-3 text-center font-medium text-indigo-700 bg-indigo-50 py-1 rounded">
                            {stop.eveningDrop}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Driver / Fleet Incharge */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-700" />
                      <span>
                        Bus Pilot: <strong className="text-gray-800">{selectedRouteForView.driverName}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-700" />
                      <span>
                        Helpline / Emergency: <strong className="text-gray-800">{selectedRouteForView.contactNumber}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <span className="text-xs text-gray-500">ACU Transport Department, B.G. Nagara Campus</span>
              <button
                onClick={() => {
                  setShowRoutesModal(false);
                  setShowApplyModal(true);
                }}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                Proceed to Apply
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: APPLY FOR TRANSPORTATION */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-200" />
                <h3 className="font-bold text-lg">Apply for ACU University Transportation (2026 - 2027)</h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    disabled
                    value={profile.fullName}
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Admission / Reg No</label>
                  <input
                    type="text"
                    disabled
                    value={profile.admissionNo}
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Bus Route *</label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => {
                    setSelectedRouteId(e.target.value);
                    const r = TRANSPORT_ROUTES.find((item) => item.routeNo === e.target.value);
                    if (r && r.stops.length > 0) {
                      setSelectedStop(r.stops[0].stopName);
                    }
                  }}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {TRANSPORT_ROUTES.map((route) => (
                    <option key={route.routeNo} value={route.routeNo}>
                      {route.routeNo} - {route.routeName} (₹{route.feePerYear.toLocaleString()}/yr)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Boarding / Pickup Stop *</label>
                <select
                  value={selectedStop}
                  onChange={(e) => setSelectedStop(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {selectedRouteObj.stops.map((st, i) => (
                    <option key={i} value={st.stopName}>
                      {st.stopName} (Pickup: {st.morningPickup} | Drop: {st.eveningDrop})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Emergency Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Parent / Guardian Contact</label>
                  <input
                    type="tel"
                    disabled
                    value={profile.parentDetails.fatherMobile}
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              {/* Fee summary box */}
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-purple-900">
                  <span>Selected Route Fee (Annual 2026-27):</span>
                  <span>₹{selectedRouteObj.feePerYear.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Assigned Bus Pilot:</span>
                  <span>
                    {selectedRouteObj.driverName} ({selectedRouteObj.contactNumber})
                  </span>
                </div>
                <div className="text-xs text-purple-700 font-medium">
                  Note: Amount will be credited to your university transport account and can be paid via Netbanking,
                  UPI or Added to your Academic Fee Ledger.
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>
                    I confirm that I have reviewed the boarding points, university commute schedule, and agree to abide
                    by the University Transportation Code of Conduct.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Transport Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ROUTE CHANGE REQUEST */}
      {showChangeRouteModal && appliedTransport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 my-8">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-200" />
                <h3 className="font-bold text-lg">Request Route / Stop Modification</h3>
              </div>
              <button
                onClick={() => setShowChangeRouteModal(false)}
                className="text-purple-200 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleChangeRouteSubmit} className="p-6 space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs space-y-1">
                <div className="text-gray-500">Current Assigned Route:</div>
                <div className="font-bold text-gray-800">
                  {appliedTransport.routeNo} - {appliedTransport.pickupStop}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">New Desired Route *</label>
                <select
                  value={newRouteId}
                  onChange={(e) => {
                    setNewRouteId(e.target.value);
                    const r = TRANSPORT_ROUTES.find((item) => item.routeNo === e.target.value);
                    if (r && r.stops.length > 0) {
                      setNewStop(r.stops[0].stopName);
                    }
                  }}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {TRANSPORT_ROUTES.map((route) => (
                    <option key={route.routeNo} value={route.routeNo}>
                      {route.routeNo} - {route.routeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">New Designated Stop *</label>
                <select
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {newRouteObj.stops.map((st, i) => (
                    <option key={i} value={st.stopName}>
                      {st.stopName} (Pickup: {st.morningPickup})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Route Change *</label>
                <textarea
                  required
                  rows={3}
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  placeholder="e.g. Relocated residence to Nelamangala area, commuting convenience..."
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowChangeRouteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  Confirm Route Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CANCEL TRANSPORTATION SERVICE */}
      {showCancelModal && appliedTransport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 my-8">
            <div className="bg-rose-700 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-200" />
                <h3 className="font-bold text-lg">Cancel Transportation Pass</h3>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-rose-200 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCancelSubmit} className="p-6 space-y-4">
              <p className="text-xs text-gray-700">
                Are you sure you wish to cancel your bus pass for <strong>{appliedTransport.routeNo}</strong>? Your pass
                will be deactivated immediately upon approval, and pro-rated fee refund will be adjusted in your
                student ledger according to university refund norms.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Cancellation *</label>
                <textarea
                  required
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="State the reason (e.g., shifted to campus hostel, using personal vehicle...)"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
                >
                  Keep My Pass
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
