import { useEffect, useState } from "react";
import { getTickets } from "../services/api";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadTickets() {
      try {
        const token = localStorage.getItem("shopassist_token");

const data = await getTickets(token);
        setTickets(data);
      } catch (err) {
        setError("Could not load your tickets.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  return (
    <section className="ticket-section">
      <h2>My Support Tickets</h2>

      <p className="section-description">
        Track issues that have been escalated to our support team.
      </p>

      {loading && <p>Loading tickets...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && tickets.length === 0 && (
        <div className="empty-tickets">
          <p>You don't have any support tickets yet.</p>
        </div>
      )}

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div className="ticket-card" key={ticket.ticket_id}>
            <div className="ticket-header">
              <strong>{ticket.ticket_id}</strong>

              <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>
            </div>

            <p>{ticket.issue}</p>

            <div className="ticket-info">
              <span>
                Priority: <strong>{ticket.priority}</strong>
              </span>

              {ticket.order_id && (
                <span>
                  Order: <strong>{ticket.order_id}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TicketList;