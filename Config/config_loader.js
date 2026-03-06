export async function loadEnv() {
    // Determinar la ruta relativa al archivo Config.env basándose en la ubicación actual
    let envPath = './Config/Config.env';
    const path = window.location.pathname;
    
    // Ajuste para subcarpetas (legal, cursos, buscador, etc.)
    if (path.includes('/legal/') || path.includes('/cursos/') || path.includes('/buscador/') || path.includes('/contact/')) {
        envPath = '../Config/Config.env';
    }

    try {
        const response = await fetch(envPath);
        if (!response.ok) throw new Error(`No se pudo cargar ${envPath}`);
        const text = await response.text();
        const env = {};
        text.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value && !line.trim().startsWith('#')) env[key.trim()] = value.trim();
        });
        return env;
    } catch (error) {
        console.error("Error cargando configuración:", error);
        return {};
    }
}