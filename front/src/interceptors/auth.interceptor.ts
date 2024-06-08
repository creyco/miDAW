import { HttpInterceptorFn } from "@angular/common/http"

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const token: string | null = sessionStorage.getItem('sesionData')
    // Obtener el token: Se intenta obtener el token de autenticación desde sessionStorage usando la clave sesionData.
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        })
        // Agregar el token de autenticación a la solicitud clonada.
        return next(cloned)   
        // Pasar la solicitud clonada: La solicitud clonada con el token en el encabezado es pasada al siguiente manejador (next).     
    }
    return next(req)
    // Si no hay token Pasar la solicitud sin cambios: La solicitud sin cambios es pasada al siguiente manejador (next).
}