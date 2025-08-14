// Elementos del DOM
const authSection = document.getElementById("authSection")!;
const controlSection = document.getElementById("controlSection")!;
const loginForm = document.getElementById("loginForm")!;
const registerForm = document.getElementById("registerForm")!;

// Elementos de autenticación
const loginUsername = document.getElementById("loginUsername") as HTMLInputElement;
const loginPassword = document.getElementById("loginPassword") as HTMLInputElement;
const registerUsername = document.getElementById("registerUsername") as HTMLInputElement;
const registerPassword = document.getElementById("registerPassword") as HTMLInputElement;
const authStatus = document.getElementById("authStatus")!;

// Botones de autenticación
const btnLogin = document.getElementById("btnLogin")!;
const btnRegister = document.getElementById("btnRegister")!;
const btnShowRegister = document.getElementById("btnShowRegister")!;
const btnShowLogin = document.getElementById("btnShowLogin")!;
const btnLogout = document.getElementById("btnLogout")!;

// Elementos de control de dispositivos
const btnRele1On = document.getElementById("btnRele1On")!;
const btnRele1Off = document.getElementById("btnRele1Off")!;
const btnRele2On = document.getElementById("btnRele2On")!;
const btnRele2Off = document.getElementById("btnRele2Off")!;
const btnRele3On = document.getElementById("btnRele3On")!;
const btnRele3Off = document.getElementById("btnRele3Off")!;
const btnRele4On = document.getElementById("btnRele4On")!;
const btnRele4Off = document.getElementById("btnRele4Off")!;
const btnRefresh = document.getElementById("btnRefresh")!;
const statusElement = document.getElementById("status")!;

// Indicadores de estado
const statusRele1 = document.getElementById("statusRele1")!;
const statusRele2 = document.getElementById("statusRele2")!;
const statusRele3 = document.getElementById("statusRele3")!;
const statusRele4 = document.getElementById("statusRele4")!;;

// Estado de autenticación
let isAuthenticated = false;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  setupEventListeners();
});

function setupEventListeners(): void {
  // Eventos de autenticación
  btnLogin.addEventListener("click", handleLogin);
  btnRegister.addEventListener("click", handleRegister);
  btnShowRegister.addEventListener("click", showRegisterForm);
  btnShowLogin.addEventListener("click", showLoginForm);
  btnLogout.addEventListener("click", handleLogout);

  // Eventos de control de dispositivos - Relé 1
  btnRele1On.addEventListener("click", () => sendCommand("rele1", "on"));
  btnRele1Off.addEventListener("click", () => sendCommand("rele1", "off"));
  
  // Eventos de control de dispositivos - Relé 2
  btnRele2On.addEventListener("click", () => sendCommand("rele2", "on"));
  btnRele2Off.addEventListener("click", () => sendCommand("rele2", "off"));
  
  // Eventos de control de dispositivos - Relé 3
  btnRele3On.addEventListener("click", () => sendCommand("rele3", "on"));
  btnRele3Off.addEventListener("click", () => sendCommand("rele3", "off"));
  
  // Eventos de control de dispositivos - Relé 4
  btnRele4On.addEventListener("click", () => sendCommand("rele4", "on"));
  btnRele4Off.addEventListener("click", () => sendCommand("rele4", "off"));

  // Evento de actualizar estado
  btnRefresh.addEventListener("click", updateDevicesStatus);

  // Enter key en formularios
  loginPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
  registerPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleRegister();
  });
}

function checkAuthStatus(): void {
  const token = localStorage.getItem('authToken');
  if (token) {
    isAuthenticated = true;
    showControlSection();
  } else {
    showAuthSection();
  }
}

function showAuthSection(): void {
  authSection.classList.remove("hidden");
  controlSection.classList.add("hidden");
  showLoginForm();
}

function showControlSection(): void {
  authSection.classList.add("hidden");
  controlSection.classList.remove("hidden");
  updateDevicesStatus(); // Actualizar estado al mostrar la sección
}

function showLoginForm(): void {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  clearInputs();
  clearStatus();
}

function showRegisterForm(): void {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  clearInputs();
  clearStatus();
}

function clearInputs(): void {
  loginUsername.value = "";
  loginPassword.value = "";
  registerUsername.value = "";
  registerPassword.value = "";
}

function clearStatus(): void {
  authStatus.textContent = "";
  authStatus.className = "";
}

async function handleLogin(): Promise<void> {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    showAuthMessage("Por favor completa todos los campos", "error");
    return;
  }

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', 'authenticated');
      isAuthenticated = true;
      showControlSection();
      showAuthMessage("Login exitoso", "success");
    } else {
      showAuthMessage(data.error || "Error al iniciar sesión", "error");
    }
  } catch (error) {
    showAuthMessage("Error de conexión", "error");
  }
}

async function handleRegister(): Promise<void> {
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();

  if (!username || !password) {
    showAuthMessage("Por favor completa todos los campos", "error");
    return;
  }

  if (password.length < 6) {
    showAuthMessage("La contraseña debe tener al menos 6 caracteres", "error");
    return;
  }

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showAuthMessage("Usuario registrado exitosamente. Ahora puedes iniciar sesión.", "success");
      setTimeout(() => {
        showLoginForm();
      }, 2000);
    } else {
      showAuthMessage(data.error || "Error al registrar usuario", "error");
    }
  } catch (error) {
    showAuthMessage("Error de conexión", "error");
  }
}

function handleLogout(): void {
  localStorage.removeItem('authToken');
  isAuthenticated = false;
  showAuthSection();
  statusElement.textContent = "";
}

function showAuthMessage(message: string, type: "success" | "error"): void {
  authStatus.textContent = message;
  authStatus.className = type;
}

async function sendCommand(device: string, command: "on" | "off"): Promise<void> {
  if (!isAuthenticated) {
    statusElement.textContent = "Debes iniciar sesión para usar esta función";
    return;
  }

  try {
    const response = await fetch(`/device/${device}/${command}`);
    const data = await response.json();
    statusElement.textContent = data.status || data.error;
    
    // Actualizar estado visual después del comando
    setTimeout(() => updateDevicesStatus(), 1000);
  } catch (error) {
    statusElement.textContent = "Error enviando comando";
    console.error(error);
  }
}

async function updateDevicesStatus(): Promise<void> {
  if (!isAuthenticated) return;

  try {
    const response = await fetch('/device/status');
    const result = await response.json();
    
    if (response.ok && result.data) {
      updateStatusIndicators(result.data);
    }
  } catch (error) {
    console.error('Error actualizando estado:', error);
  }
}

function updateStatusIndicators(status: any): void {
  updateStatusIndicator(statusRele1, status.rele1);
  updateStatusIndicator(statusRele2, status.rele2);
  updateStatusIndicator(statusRele3, status.rele3);
  updateStatusIndicator(statusRele4, status.rele4);
}

function updateStatusIndicator(element: HTMLElement, status: string): void {
  element.textContent = status;
  element.className = `status-indicator ${status.toLowerCase()}`;
}
