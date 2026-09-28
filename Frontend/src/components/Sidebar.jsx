import {
  Coins,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  User,
  X,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { deleteConversation } from "../features/deleteConversation.js";
import { useEffect, useState } from "react";
import { getConversation } from "../features/getConversation.js";
import { createConversation } from "../features/createConversation.js";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  addConversation,
  setConversation,
  setSelectedConversation,
  removeConversation
} from "../redux/conversationSlice.js";
import logOut from "../features/logOut.js";
import { setUserData } from "../redux/userSlice.js";
import BillingDrawer from "./BillingDrawer.jsx";
import { clearMessages } from "../redux/messagesSlice.js";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const { userData } = useSelector((state) => state.user);
  const [showBilling, setShowBilling] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [confirmDeleteConv, setConfirmDeleteConv] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);

  const handleCreateConversation = async () => {
    const data = await createConversation();
    console.log(data);
    if (data) {
      dispatch(addConversation(data));
    }
  };
  useEffect(() => {
    const getConv = async () => {
      const data = await getConversation();
      dispatch(setConversation(data));
    };
    getConv();
  }, [dispatch, userData?.userId]);

  if (collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-14 h-screen bg-[#0d0f14] border-r border-white/6 py-4 gap-1 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
        >
          <PanelRight />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
          onClick={() => dispatch(setSelectedConversation(null))}
        >
          <Plus />
        </button>
        <div className="flex-1 overflow-y-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden pt-10">
          {conversations.map((conv) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                key={conv._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive ? "bg-indigo-500/10 border-indigo-500/18" : "bg-transparent border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/5 text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <img
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
              src={userData?.avatar}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/6 flex items-center justify-center">
              <User size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/6 text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer">
        <Menu size={14} />
      </button>

      {
        mobileOpen && <div onClick={() => setMobileOpen(false)} className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      }

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] flex border-r border-white/6 transition-transform duration-250 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/6">
            <button onClick={() => setMobileOpen(false)} className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer ">
              <X />
            </button>
            <div
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
              onClick={() => setCollapsed(true)}
            >
              <PanelLeftIcon />
            </div>
            <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
              CortexAI
            </span>
            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
              {`${userData?.plan}`}
            </span>
            <button
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
              onClick={() => dispatch(setSelectedConversation(null))}
            >
              <PenSquare size={14} />
            </button>
          </div>

          <div className="px-4 pt-4 pb-1">
            <button
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
              onClick={() => dispatch(setSelectedConversation(null))}
            >
              <Plus size={15} />
              New Chat
            </button>
          </div>
          {conversations.length == 0 ? (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              No Recent Conversations
            </div>
          ) : (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              Recents
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-2.5 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {conversations.map((conv) => {
              const isActive = selectedConversation?._id == conv?._id;
              return (
                <div
                  key={conv._id}
                  onClick={() => dispatch(setSelectedConversation(conv))}
                  className={`flex items-center justify-between w-full h-[48px] gap-2 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${isActive
                      ? "bg-indigo-500/10 border-indigo-500/18"
                      : "bg-transparent border-transparent"
                    }`}
                >
                  {/* LEFT SIDE */}
                  <div className="flex gap-2">

                    {/* ICON */}
                    <div
                      className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-lg transition-colors duration-150 ${isActive
                          ? "bg-indigo-500/15 text-indigo-400"
                          : "bg-white/5 text-slate-500"
                        }`}
                    >
                      <MessageSquare size={13} />
                    </div>

                    {/* TITLE */}
                    <span
                      className={`block w-[165px] max-w-[165px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px] font-medium ${isActive
                          ? "text-slate-100"
                          : "text-slate-300"
                        }`}
                    >
                      {conv.title || "NEW CHAT"}
                    </span>
                  </div>

                  {/* DELETE */}
                  <button
                    type="button"
                    className="shrink-0 w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConversationToDelete(conv._id);
                      setConfirmDeleteConv(true);
                    }}
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mx-2.5 h-px bg-white/6" />

          <div className="px-3.5 py-3.5">
            {userData ? (
              <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors duration-150">
                <div className="relative shrink-0">
                  {userData?.avatar && !imageError ? (
                    <img
                      className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                      src={userData?.avatar}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-[10px] bg-white/6 flex items-center justify-center">
                      <User size={15} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                    {userData?.name || "user"}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-px">
                    {`${userData?.plan}` || "free plan"}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button onClick={() => setShowBilling(true)} className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/8 hover:text-slate-400 transition-all duration-150">
                    <Coins size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/8 hover:text-slate-400 transition-all duration-150"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/5 border border-white/8 rounded-xl py-2.75 cursor-pointer hover:bg-white/8 transition-colors duration-150">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#151821] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">
              Confirm logout
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to log out?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                No
              </button>

              <button
                type="button"
                onClick={() => {
                  logOut();
                  dispatch(setUserData(null));
                  setShowLogoutConfirm(false);
                }}
                className="rounded-lg bg-red-500/15 px-4 py-2 text-sm text-red-400 hover:bg-red-500/25"
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmDeleteConv && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setConfirmDeleteConv(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#151821] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">
              Confirm delete conversation
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to delete this conversation
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmDeleteConv(false);
                  setConversationToDelete(null);
                }}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                No
              </button>

              <button
                type="button"
                onClick={() => {
                  deleteConversation(conversationToDelete);
                  dispatch(removeConversation(conversationToDelete));
                  if (selectedConversation?._id === conversationToDelete) {
                    dispatch(clearMessages());
                    dispatch(setSelectedConversation(null));
                  }
                  setConversationToDelete(null);
                  setConfirmDeleteConv(false);
                }}
                className="rounded-lg bg-red-500/15 px-4 py-2 text-sm text-red-400 hover:bg-red-500/25"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <BillingDrawer
        open={showBilling}
        onClose={() => setShowBilling(false)}
      />
    </>
  );
};

export default Sidebar;
