export class ApiConstants {
  // ========== BASE PATHS ==========
  private static readonly BASE_CONFIG =
    'PortalFomeviConfiguration/Configuration/';
  private static readonly BASE_PQRS = 'PortalFomeviPQRS/pqrs/';

  // ========== HELPERS ==========
  private static withBase = (base: string, action: string) =>
    `${base}${action}`;

  // ========== GLOBAL MESSAGES ==========
  // SUCCESS
  static readonly ALERT_SUCCESS_COMPLETE = 'Operación completada con éxito.';
  static readonly ALERT_SUCCESS_UPDATE = 'Actualización realizada con éxito.';
  static readonly ALERT_SUCCESS_SAVED = 'Los datos se guardaron exitosamente';
  static readonly ALERT_USER_EXIST = 'El asociado se encuentra activo';
  static readonly ALERT_MESSAGE_DOWNLOAD = 'Desea descargar el archivo?';
  static readonly ALERT_USERVALIDATE_EXIST =
    'Hola {name}, puedes ingresar tu solicitud de PQRS';
  static readonly ALERT_USERVALIDATE_NOTEXIST =
    'El asociado no se encuentra activo, por favor contacta a FOMEVI para más información.';
  static readonly ALERT_SUCCESS_PQRS_SAVED =
    'Su solicitiud de PQRS fue registrada exitosamente. Con su número de documento puede consultar el estado del radicado.  Su {peticion} será contestada a mas tardar en 10 días hábiles por este mismo medio.'; // Mensaje de éxito al guardar PQRS
  static readonly ALERT_ERROR_DOCUMENT =
    'El documento ingresado no es válido. Por favor, verifique y vuelva a intentarlo.';
  static readonly ALERT_SUCCESS_CREDIT_SAVED =
    'Su solicitiud de crédito fue registrada exitosamente.'; // Mensaje de éxito al guardar PQRS
  static readonly ALERT_SUCCESS_SURVEY_SAVED =
    'Tu encuesta: {0} se ha guardado correctamente. Gracias por participar.';
  // WARNING
  static readonly ALERT_WARNING_DATA_REQUIRED =
    'Por favor, complete todos los campos requeridos.';
  static readonly ALERT_WARNING_DATA_REMOVE = '¿ Desea eliminar el registro ?';
  static readonly ALERT_WARNING_NOTISVALID =
    'Este archivo no es válido. Solo se permiten imágenes en formato JPG, PNG o GIF.';
  static readonly ALERT_WARNING_FILE_SIZE =
    'El tamaño del archivo es demasiado grande. Máximo permitido: 2MB.';
  static readonly ALERT_WARNING_NOTFIND_RESULTS =
    'No se encontraron resultados con los filtros seleccionados.';

  // ERROR
  static readonly ALERT_ERROR_SOPORT_TECHNICAL =
    'Ocurrió un error inesperado. Por favor, contacte al soporte técnico.';
  static readonly ALERT_ERROR_ACCESS_DENIED =
    'Acceso denegado. No tiene permisos para realizar esta acción.';
  static readonly ALERT_ERROR_SAVE_DATA =
    'Error al guardar los datos. Intente nuevamente más tarde.';
  static readonly ALERT_ERROR_GET_DATA = 'Error al obtener los registros';
  static readonly ALERT_ERROR_GET_USEREXIST =
    'El documento ingresado no es asociado de FOMEVI';

  // NOTIFICATIONS
  static readonly ALERT_NOTIFICATION_NEW =
    'Tienes una nueva notificación pendiente.';
  static readonly ALERT_NOTIFICATION_EXPIRED_SESSION =
    'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';

  // BANNER
  static readonly GET_BANNER = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'GetBanner'
  );

  // PQRS TYPE CATEGORY
  static readonly GET_PQRSTYPECATEGORY = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'PqrsTypeCategoryGetByPqrsTypeId'
  );

  static readonly GET_PQRSTYPE = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'GetPqrsTypes'
  );

  static readonly INSERT_PQRS = ApiConstants.withBase(
    ApiConstants.BASE_PQRS,
    'InsertPqrs'
  );

  static readonly GET_PQRSBY_DOCUMENT = ApiConstants.withBase(
    ApiConstants.BASE_PQRS,
    'GetSearcherByUserPqrs'
  );

  // NEWS
  static readonly GET_NEW = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'GetNew'
  );
  static readonly GET_NEW_CURRENT = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'GetCurrentNews'
  );
  static readonly GET_NEW_BY_ID = ApiConstants.withBase(
    ApiConstants.BASE_CONFIG,
    'GetNewById'
  );
}
