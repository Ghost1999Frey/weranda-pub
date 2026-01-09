export interface EventSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  description: string;
  submittedAt: string;
  status: "new" | "reviewed" | "approved" | "rejected";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: "new" | "read" | "replied";
}

export interface TableReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  submittedAt: string;
  status: "new" | "confirmed" | "cancelled";
}

export interface Review {
  id: string;
  author: string;
  email: string;
  rating: number;
  text: string;
  submittedAt: string;
  status: "new" | "approved" | "rejected";
}

export const getSubmissions = () => {
  const events = JSON.parse(localStorage.getItem("werandaEventSubmissions") || "[]") as EventSubmission[];
  const messages = JSON.parse(localStorage.getItem("werandaContactMessages") || "[]") as ContactMessage[];
  const reservations = JSON.parse(localStorage.getItem("werandaReservations") || "[]") as TableReservation[];
  const reviews = JSON.parse(localStorage.getItem("werandaReviews") || "[]") as Review[];
  
  return { events, messages, reservations, reviews };
};

export const addEventSubmission = (submission: Omit<EventSubmission, "id" | "submittedAt" | "status">) => {
  const events = JSON.parse(localStorage.getItem("werandaEventSubmissions") || "[]") as EventSubmission[];
  const newEvent: EventSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new"
  };
  events.push(newEvent);
  localStorage.setItem("werandaEventSubmissions", JSON.stringify(events));
  return newEvent;
};

export const addContactMessage = (message: Omit<ContactMessage, "id" | "submittedAt" | "status">) => {
  const messages = JSON.parse(localStorage.getItem("werandaContactMessages") || "[]") as ContactMessage[];
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new"
  };
  messages.push(newMessage);
  localStorage.setItem("werandaContactMessages", JSON.stringify(messages));
  return newMessage;
};

export const addReservation = (reservation: Omit<TableReservation, "id" | "submittedAt" | "status">) => {
  const reservations = JSON.parse(localStorage.getItem("werandaReservations") || "[]") as TableReservation[];
  const newReservation: TableReservation = {
    ...reservation,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new"
  };
  reservations.push(newReservation);
  localStorage.setItem("werandaReservations", JSON.stringify(reservations));
  return newReservation;
};

export const addReview = (review: Omit<Review, "id" | "submittedAt" | "status">) => {
  const reviews = JSON.parse(localStorage.getItem("werandaReviews") || "[]") as Review[];
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new"
  };
  reviews.push(newReview);
  localStorage.setItem("werandaReviews", JSON.stringify(reviews));
  return newReview;
};

export const updateEventStatus = (id: string, status: EventSubmission["status"]) => {
  const events = JSON.parse(localStorage.getItem("werandaEventSubmissions") || "[]") as EventSubmission[];
  const event = events.find(e => e.id === id);
  if (event) {
    event.status = status;
    localStorage.setItem("werandaEventSubmissions", JSON.stringify(events));
  }
};

export const updateMessageStatus = (id: string, status: ContactMessage["status"]) => {
  const messages = JSON.parse(localStorage.getItem("werandaContactMessages") || "[]") as ContactMessage[];
  const message = messages.find(m => m.id === id);
  if (message) {
    message.status = status;
    localStorage.setItem("werandaContactMessages", JSON.stringify(messages));
  }
};

export const updateReservationStatus = (id: string, status: TableReservation["status"]) => {
  const reservations = JSON.parse(localStorage.getItem("werandaReservations") || "[]") as TableReservation[];
  const reservation = reservations.find(r => r.id === id);
  if (reservation) {
    reservation.status = status;
    localStorage.setItem("werandaReservations", JSON.stringify(reservations));
  }
};

export const updateReviewStatus = (id: string, status: Review["status"]) => {
  const reviews = JSON.parse(localStorage.getItem("werandaReviews") || "[]") as Review[];
  const review = reviews.find(r => r.id === id);
  if (review) {
    review.status = status;
    localStorage.setItem("werandaReviews", JSON.stringify(reviews));
  }
};

export const deleteSubmission = (type: "event" | "message" | "reservation" | "review", id: string) => {
  const keys = {
    event: "werandaEventSubmissions",
    message: "werandaContactMessages",
    reservation: "werandaReservations",
    review: "werandaReviews"
  };
  
  const key = keys[type];
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  const filtered = items.filter((item: any) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
};
