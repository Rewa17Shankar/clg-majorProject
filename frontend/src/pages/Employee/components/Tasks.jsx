import React, { useEffect, useState } from "react";
import {
  getEmployeeTasks,
  updateTaskStatus,
  submitTask,
} from "../../../api/EMPLOYEE/taskApi";


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);


  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getEmployeeTasks();
      setTasks(res.tasks || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch (e) {
      alert("Error updating status");
    }
  };

 const handleSubmitTask = async () => {
  try {
    setSubmitting(true);

    let fileUrl = "";
    if (file) {
      fileUrl = URL.createObjectURL(file); 
    }

    await submitTask(selectedTask.id, {
      completionNote: note,
      attachedUrl: fileUrl,
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id ? { ...t, status: "Completed" } : t
      )
    );

    setSelectedTask(null);
    setNote("");
    setFile(null);

    alert("Task submitted!");
  } catch (e) {
    alert("Submission failed!");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 tracking-wide">My Tasks</h2>

      {loading && <p>Loading...</p>}

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#ffffff18] backdrop-blur-lg border border-[#ffffff30] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {/* TOP SECTION */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Due:{" "}
                  <span className="text-gray-200 font-medium">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "No Due Date"}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      task.status === "Pending"
                        ? "text-yellow-400"
                        : task.status === "In Progress"
                        ? "text-blue-400"
                        : "text-green-400"
                    } font-semibold`}
                  >
                    {task.status}
                  </span>
                </p>

                {/* ACTION BUTTONS */}
                {task.status === "Pending" && (
                  <button
                    onClick={() => handleUpdateStatus(task.id, "In Progress")}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
                  >
                    Start Task
                  </button>
                )}

                {task.status === "In Progress" && (
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                  >
                    Mark Complete
                  </button>
                )}

                {task.status === "Completed" && (
                  <p className="text-xs text-green-400 font-semibold mt-2">
                    ✓ Submitted
                  </p>
                )}
              </div>
            </div>

            {/* SUBMISSION SECTION */}
            {task.task_submissions?.length > 0 && (
              <div className="mt-5 bg-[#ffffff10] rounded-xl p-4 text-sm border border-[#ffffff25]">
                <p className="font-semibold mb-1">Your last submission:</p>
                <p className="text-gray-300">
                  {task.task_submissions[0].completion_note}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(
                    task.task_submissions[0].submitted_at
                  ).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}{selectedTask && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
    <div className="bg-[#1f1f1f] p-6 rounded-xl w-96 shadow-2xl border border-gray-700">
      <h3 className="text-xl font-semibold mb-3">
        Submit Task: {selectedTask.title}
      </h3>

      <textarea
        placeholder="Write completion note..."
        className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white mb-4"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* FILE UPLOAD */}
      <label className="block text-sm font-medium mb-1">Attach File</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-gray-300 mb-3"
      />

      {file && (
        <p className="text-xs text-green-400 mb-2">
          Selected: {file.name}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setSelectedTask(null);
            setFile(null);
          }}
          className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmitTask}
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
          {submitting ? "Submitting..." : "Submit Task"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
