# CalculoBasesAIEFE

Una aplicación web completa para calcular y analizar bases de hormigón de forma rápida y precisa. Diseñada para ingenieros y profesionales de la construcción que necesitan dimensionar fundaciones con cálculos automáticos y verificaciones de seguridad.

## 📋 Tabla de Contenidos

- [¿Qué es CalculoBasesAIEFE?](#qué-es-calculobasesaiefe)
- [Características](#características)
- [Cómo Usar la Aplicación](#cómo-usar-la-aplicación)
- [Guía para Desarrolladores](#guía-para-desarrolladores)
- [Contribuir](#contribuir)
- [Soporte](#soporte)
- [Licencia](#licencia)

---

## ¿Qué es CalculoBasesAIEFE?

CalculoBasesAIEFE es una herramienta profesional que automátiza el diseño de fundaciones en hormigón armado. En lugar de realizar cálculos manuales que consumen horas, esta aplicación realiza todos los cálculos de forma instantánea y genera informes detallados con diagramas.

### ¿Para quién es?

- Ingenieros civiles y estructurales
- Proyectistas de edificios
- Empresas constructoras
- Estudiantes de ingeniería

## ✨ Características

**🏗️ Cálculo Automático de Dimensiones**

- Calcula automáticamente el largo, ancho y espesor de la fundación
- Determina la cantidad y espaciado de acero de refuerzo necesario
- Ajusta las dimensiones según cargas y condiciones del suelo

**📊 Análisis de Esfuerzos**

- Calcula distribución de presiones sobre el suelo
- Verifica que las presiones no excedan la capacidad del terreno
- Analiza esfuerzos por corte y punzonamiento

**💰 Estimación de Costos**

- Calcula volumen de hormigón y peso de acero necesario
- Estima costos de excavación
- Proporciona presupuesto total de la fundación

**📐 Diagramas Visuales**

- Visualiza la planta de la fundación
- Ve cortes en ambas direcciones
- Entiende mejor el diseño propuesto

**📋 Gestión de Proyectos**

- Guarda múltiples diseños de fundaciones
- Compara diferentes alternativas
- Exporta e importa datos fácilmente

**🔍 Transparencia en Cálculos**

- Ve las fórmulas utilizadas en cada paso
- Entiende cómo se llegó a los resultados
- Valida los cálculos según normas

## 🎯 Cómo Usar la Aplicación

### Crear un Nuevo Diseño

1. **Ingresa a "Nueva Base"** en el menú principal
2. **Carga los datos del proyecto**:

   - Nombre de la fundación
   - Carga vertical (axil)
   - Fuerzas de corte en X e Y
   - Momentos en X e Y
   - Capacidad de carga del suelo

3. **Configura parámetros avanzados** (opcional):

   - Resistencia del hormigón
   - Resistencia del acero
   - Diámetro de barras de refuerzo
   - Costos unitarios de materiales

4. **Presiona "Calcular"** para generar resultados

### Ver Resultados

La vista de resultados muestra:

- ✅ **Dimensiones**: Largo, ancho y espesor de la base
- ✅ **Armadura**: Número de barras y espaciamiento
- ✅ **Verificaciones**: Presión sobre suelo, corte, punzonamiento
- ✅ **Diagramas**: Visualización de la fundación
- ✅ **Costos**: Desglose de gastos en materiales y excavación

### Gestionar Diseños

- **Tabla de bases**: Ve todos tus diseños guardados
- **Editar**: Modifica un diseño existente
- **Exportar**: Descarga los datos para usar en otros programas
- **Comparar**: Analiza diferentes alternativas de diseño

---

# 👨‍💻 Guía para Desarrolladores

Esta sección está dirigida a desarrolladores que quieran contribuir al proyecto o trabajar con el código.

## 🚀 Requisitos Previos

- Node.js versión 16.x o superior
- npm o yarn

## 📥 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd CalculoBasesAIEFE
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Compilar para Producción

```bash
npm run build
```

Los archivos compilados se guardarán en la carpeta `dist/`

## 🛠️ Comandos Disponibles

| Comando           | Descripción                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build`   | Compila la aplicación para producción                    |
| `npm run lint`    | Verifica la calidad del código con ESLint                |
| `npm run preview` | Vista previa de la compilación de producción localmente  |

## 📁 Estructura del Proyecto

```
CalculoBasesAIEFE/
├── src/
│   ├── components/                      # Componentes React
│   │   ├── BasesHormigonTable/          # Tabla principal de fundaciones
│   │   ├── NuevaBaseForm/               # Formulario para crear bases
│   │   ├── ResultadosBase/              # Vista de resultados
│   │   ├── FormulasCalculoArmadura/     # Fórmulas de armadura
│   │   ├── FormulasVerificacionesBase/  # Fórmulas de verificación
│   │   ├── DiagramaPlantaBase/          # Diagrama de planta
│   │   ├── DiagramaVistaXBase/          # Vista X
│   │   ├── DiagramaVistaYBase/          # Vista Y
│   │   ├── AjustesModal/                # Modal de configuración
│   │   ├── FormulaResult/               # Componente de resultado
│   │   ├── Navbar/                      # Barra de navegación
│   │   └── ...                          # Más componentes
│   │
│   ├── types/                           # Definiciones TypeScript
│   │   ├── BaseHormigon.ts              # Interfaz principal
│   │   ├── BaseHormigonDimensiones.ts   # Dimensiones
│   │   ├── BaseHormigonEsfuerzos.ts     # Esfuerzos
│   │   ├── BaseHormigonVerificaciones.ts# Verificaciones
│   │   ├── BaseHormigonArmadura.ts      # Armadura
│   │   └── ...                          # Más tipos
│   │
│   ├── context/                         # Context API de React
│   │   └── automatico-context.tsx       # Contexto de estado global
│   │
│   ├── store/                           # Configuración Redux
│   │   └── [archivos de store]          # Slices y acciones
│   │
│   ├── utils/                           # Funciones utilitarias
│   │   └── [funciones comunes]          # Helpers y utilidades
│   │
│   ├── assets/                          # Archivos estáticos
│   │
│   ├── App.tsx                          # Componente raíz
│   ├── main.tsx                         # Punto de entrada
│   └── index.css                        # Estilos globales
│
├── public/                              # Archivos públicos
├── package.json                         # Dependencias y scripts
├── tsconfig.json                        # Configuración TypeScript
├── vite.config.ts                       # Configuración Vite
├── eslint.config.js                     # Configuración ESLint
└── README.md                            # Este archivo
```

## 🏗️ Stack Tecnológico

| Tecnología        | Propósito                           | Versión |
| ----------------- | ----------------------------------- | ------- |
| **React**         | Framework de interfaz               | 19.x    |
| **TypeScript**    | Tipado estático                     | 5.8.x   |
| **Vite**          | Herramienta de compilación          | 6.x     |
| **Redux Toolkit** | Gestión de estado                   | 2.8.x   |
| **Tailwind CSS**  | Framework de estilos                | 4.x     |
| **SASS**          | Preprocesador CSS                   | 1.89.x  |
| **KaTeX**         | Renderizado de fórmulas matemáticas | 3.x     |
| **Konva.js**      | Dibujo de diagramas interactivos    | 9.x     |
| **Axios**         | Cliente HTTP                        | 1.9.x   |
| **FontAwesome**   | Iconos                              | 6.7.x   |
| **ESLint**        | Análisis de código                  | 9.x     |

## 📝 Estándares de Código

### Calidad de Código

El proyecto utiliza ESLint para mantener la calidad del código:

```bash
npm run lint
```

Para corregir errores automáticamente:

```bash
npm run lint -- --fix
```

### Estructura de Componentes

Los componentes siguen esta estructura:

- Componentes funcionales con hooks
- Tipado completo con TypeScript
- Separación de lógica y presentación
- Reutilización de componentes

### Convenciones de Nombres

- **Archivos de componentes**: PascalCase (ej: `NuevaBaseForm.tsx`)
- **Archivos de utilidades**: camelCase (ej: `calculateDimensions.ts`)
- **Componentes**: PascalCase (ej: `<BasesHormigonTable />`)
- **Funciones**: camelCase (ej: `calculateStress()`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_ITERATIONS`)

## 🧪 Pruebas

Para ejecutar las pruebas (cuando estén configuradas):

```bash
npm run test
```

## 🔧 Configuración del Editor

Se recomienda usar Visual Studio Code con las siguientes extensiones:

- ESLint
- Prettier
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense

## 🤝 Contribuir

Si deseas contribuir al proyecto:

1. **Fork** el repositorio
2. **Crea una rama** para tu feature: `git checkout -b feature/AmazingFeature`
3. **Realiza tus cambios** y haz commit: `git commit -m 'Add some AmazingFeature'`
4. **Sube a la rama**: `git push origin feature/AmazingFeature`
5. **Abre un Pull Request**

Para cambios sustanciales, abre primero un issue para discutir los cambios propuestos.

## 📞 Soporte

Para reportar bugs o sugerir mejoras, utiliza el [Issue Tracker](https://github.com/tuusuario/CalculoBasesAIEFE/issues) del proyecto.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.
