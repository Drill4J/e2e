#ifndef KONAN_LIBDRILL_AGENT_H
#define KONAN_LIBDRILL_AGENT_H
#ifdef __cplusplus
extern "C" {
#endif
#ifdef __cplusplus
typedef bool            libdrill_agent_KBoolean;
#else
typedef _Bool           libdrill_agent_KBoolean;
#endif
typedef unsigned short     libdrill_agent_KChar;
typedef signed char        libdrill_agent_KByte;
typedef short              libdrill_agent_KShort;
typedef int                libdrill_agent_KInt;
typedef long long          libdrill_agent_KLong;
typedef unsigned char      libdrill_agent_KUByte;
typedef unsigned short     libdrill_agent_KUShort;
typedef unsigned int       libdrill_agent_KUInt;
typedef unsigned long long libdrill_agent_KULong;
typedef float              libdrill_agent_KFloat;
typedef double             libdrill_agent_KDouble;
typedef float __attribute__ ((__vector_size__ (16))) libdrill_agent_KVector128;
typedef void*              libdrill_agent_KNativePtr;
struct libdrill_agent_KType;
typedef struct libdrill_agent_KType libdrill_agent_KType;

typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Byte;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Short;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Int;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Long;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Float;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Double;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Char;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Boolean;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Unit;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_common_AgentType;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Config;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_State;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_collections_List;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_JavaProcess;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_collections_Map;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Function1;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_collections_Iterable;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Any;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_AgentArguments;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_internal_SerializationConstructorMarker;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_descriptors_SerialDescriptor;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_Array;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_encoding_Decoder;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_encoding_Encoder;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_AgentArguments_Companion;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_KSerializer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_DataService;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_ByteArray;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_DataServiceStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Gaps;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_collections_MutableList;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_NativeRegistry;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlin_time_TimeMark;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Type;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Type_STRING;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Type_BOOLEAN;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_Type_INTEGER;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSource;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_Transformer;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_agent_serialization_SimpleMapDecoder;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_serialization_modules_SerializersModule;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_plugin_DrillRequest;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_kotlinx_cinterop_CValuesRef;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_request_RequestHolder;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_core_Agent;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_common_PluginMetadata;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_plugin_api_processing_UnloadReason;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_core_plugin_loader_InstrumentationNativePlugin;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_logger_NativeApiStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_request_PluginExtension;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub;
typedef struct {
  libdrill_agent_KNativePtr pinned;
} libdrill_agent_kref_com_epam_drill_request_RequestHolderStub;

extern void Java_com_epam_drill_agent_classloading_WebContainerSource_webAppStarted(void* env, void* thiz, void* arg1);
extern void* Java_com_epam_drill_agent_instrument_TomcatTransformer_idHeaderConfigKey(void* env, void* thiz);
extern void* Java_com_epam_drill_agent_instrument_TomcatTransformer_idHeaderConfigValue(void* env, void* thiz);
extern void* Java_com_epam_drill_agent_instrument_TomcatTransformer_retrieveAdminAddress(void* env, void* thiz);
extern void* JNIEn();
extern void* JNIFun();
extern void* currentThread();
extern void disableJvmtiEventBreakpoint(void* thread);
extern void disableJvmtiEventClassFileLoadHook(void* thread);
extern void disableJvmtiEventClassLoad(void* thread);
extern void disableJvmtiEventClassPrepare(void* thread);
extern void disableJvmtiEventCompiledMethodLoad(void* thread);
extern void disableJvmtiEventCompiledMethodUnload(void* thread);
extern void disableJvmtiEventDataDumpRequest(void* thread);
extern void disableJvmtiEventDynamicCodeGenerated(void* thread);
extern void disableJvmtiEventException(void* thread);
extern void disableJvmtiEventExceptionCatch(void* thread);
extern void disableJvmtiEventFieldAccess(void* thread);
extern void disableJvmtiEventFieldModification(void* thread);
extern void disableJvmtiEventFramePop(void* thread);
extern void disableJvmtiEventGarbageCollectionFinish(void* thread);
extern void disableJvmtiEventGarbageCollectionStart(void* thread);
extern void disableJvmtiEventMethodEntry(void* thread);
extern void disableJvmtiEventMethodExit(void* thread);
extern void disableJvmtiEventMonitorContendedEnter(void* thread);
extern void disableJvmtiEventMonitorContendedEntered(void* thread);
extern void disableJvmtiEventMonitorWait(void* thread);
extern void disableJvmtiEventMonitorWaited(void* thread);
extern void disableJvmtiEventNativeMethodBind(void* thread);
extern void disableJvmtiEventObjectFree(void* thread);
extern void disableJvmtiEventResourceExhausted(void* thread);
extern void disableJvmtiEventSingleStep(void* thread);
extern void disableJvmtiEventThreadEnd(void* thread);
extern void disableJvmtiEventThreadStart(void* thread);
extern void disableJvmtiEventVmDeath(void* thread);
extern void disableJvmtiEventVmInit(void* thread);
extern void disableJvmtiEventVmObjectAlloc(void* thread);
extern void disableJvmtiEventVmStart(void* thread);
extern libdrill_agent_kref_com_epam_drill_plugin_DrillRequest drillRequest();
extern void enableJvmtiEventBreakpoint(void* thread);
extern void enableJvmtiEventClassFileLoadHook(void* thread);
extern void enableJvmtiEventClassLoad(void* thread);
extern void enableJvmtiEventClassPrepare(void* thread);
extern void enableJvmtiEventCompiledMethodLoad(void* thread);
extern void enableJvmtiEventCompiledMethodUnload(void* thread);
extern void enableJvmtiEventDataDumpRequest(void* thread);
extern void enableJvmtiEventDynamicCodeGenerated(void* thread);
extern void enableJvmtiEventException(void* thread);
extern void enableJvmtiEventExceptionCatch(void* thread);
extern void enableJvmtiEventFieldAccess(void* thread);
extern void enableJvmtiEventFieldModification(void* thread);
extern void enableJvmtiEventFramePop(void* thread);
extern void enableJvmtiEventGarbageCollectionFinish(void* thread);
extern void enableJvmtiEventGarbageCollectionStart(void* thread);
extern void enableJvmtiEventMethodEntry(void* thread);
extern void enableJvmtiEventMethodExit(void* thread);
extern void enableJvmtiEventMonitorContendedEnter(void* thread);
extern void enableJvmtiEventMonitorContendedEntered(void* thread);
extern void enableJvmtiEventMonitorWait(void* thread);
extern void enableJvmtiEventMonitorWaited(void* thread);
extern void enableJvmtiEventNativeMethodBind(void* thread);
extern void enableJvmtiEventObjectFree(void* thread);
extern void enableJvmtiEventResourceExhausted(void* thread);
extern void enableJvmtiEventSingleStep(void* thread);
extern void enableJvmtiEventThreadEnd(void* thread);
extern void enableJvmtiEventThreadStart(void* thread);
extern void enableJvmtiEventVmDeath(void* thread);
extern void enableJvmtiEventVmInit(void* thread);
extern void enableJvmtiEventVmObjectAlloc(void* thread);
extern void enableJvmtiEventVmStart(void* thread);
extern void* jvmtix();
extern void SetEventCallbacksP(libdrill_agent_kref_kotlinx_cinterop_CValuesRef callbacks, libdrill_agent_KInt size_of_callbacks);
extern void sendToSocket(const char* pluginId, const char* message);
extern void* Java_com_epam_drill_plugin_api_Native_GetAllLoadedClasses(void* env, void* thiz);
extern void JNI_CreateJavaVM();
extern void JNI_GetCreatedJavaVMs();
extern void JNI_GetDefaultJavaVMInitArgs();
extern void JNI_OnUnload();
extern libdrill_agent_KUInt Java_com_epam_drill_plugin_api_Native_RetransformClasses(void* env, void* thiz, libdrill_agent_KInt count, void* classes);
extern libdrill_agent_KInt Java_com_epam_drill_plugin_api_Native_RetransformClassesByPackagePrefixes(void* env, void* thiz, void* prefixes);
extern libdrill_agent_KInt Agent_OnLoad(void* vmPointer, const char* options, libdrill_agent_KLong reservedPtr);
extern void Agent_OnUnload(void* vmPointer);
extern libdrill_agent_KUInt checkEx(libdrill_agent_KUInt errCode, const char* funName);
extern void* currentEnvs();
extern void* getJvm();
extern void* jvmtii();
extern void Java_com_epam_drill_plugin_PluginSender_send(void* envs, void* thiz, void* jpluginId, void* jmessage);
extern libdrill_agent_KInt Java_com_epam_drill_logger_NativeApi_getLogLevel(void* env, void* thiz);
extern void Java_com_epam_drill_logger_NativeApi_output(void* env, void* thiz, void* arg1);
extern void Java_com_epam_drill_logger_NativeApi_setFilename(void* env, void* thiz, void* arg1);
extern void Java_com_epam_drill_logger_NativeApi_setLogLevel(void* env, void* thiz, libdrill_agent_KInt arg1);
extern void Java_com_epam_drill_request_PluginExtension_processServerRequest(void* env, void* thiz);
extern void Java_com_epam_drill_request_PluginExtension_processServerResponse(void* env, void* thiz);

typedef struct {
  /* Service functions. */
  void (*DisposeStablePointer)(libdrill_agent_KNativePtr ptr);
  void (*DisposeString)(const char* string);
  libdrill_agent_KBoolean (*IsInstance)(libdrill_agent_KNativePtr ref, const libdrill_agent_KType* type);
  libdrill_agent_kref_kotlin_Byte (*createNullableByte)(libdrill_agent_KByte);
  libdrill_agent_kref_kotlin_Short (*createNullableShort)(libdrill_agent_KShort);
  libdrill_agent_kref_kotlin_Int (*createNullableInt)(libdrill_agent_KInt);
  libdrill_agent_kref_kotlin_Long (*createNullableLong)(libdrill_agent_KLong);
  libdrill_agent_kref_kotlin_Float (*createNullableFloat)(libdrill_agent_KFloat);
  libdrill_agent_kref_kotlin_Double (*createNullableDouble)(libdrill_agent_KDouble);
  libdrill_agent_kref_kotlin_Char (*createNullableChar)(libdrill_agent_KChar);
  libdrill_agent_kref_kotlin_Boolean (*createNullableBoolean)(libdrill_agent_KBoolean);
  libdrill_agent_kref_kotlin_Unit (*createNullableUnit)(void);

  /* User functions. */
  struct {
    struct {
      struct {
        struct {
          struct {
            libdrill_agent_kref_com_epam_drill_common_AgentType (*get_AGENT_TYPE)();
            const char* (*get_DRILL_PACKAGE)();
            const char* (*get_HTTP_HOOK_ENABLED)();
            const char* (*get_KAFKA_CONSUMER_SPRING)();
            const char* (*get_KAFKA_PRODUCER_INTERFACE)();
            const char* (*get_SPRING_BOOT_PREFIX)();
            const char* (*get_SYSTEM_CONFIG_PATH)();
            const char* (*get_SYSTEM_HTTP_HOOK_ENABLED)();
            const char* (*get_SYSTEM_JAVA_APP_JAR)();
            struct {
              libdrill_agent_kref_com_epam_drill_agent_Config (*get_config)();
              libdrill_agent_kref_com_epam_drill_agent_State (*get_state)();
              libdrill_agent_kref_kotlin_collections_List (*getProcessInfo)(libdrill_agent_KInt bufferSize);
              libdrill_agent_kref_com_epam_drill_agent_JavaProcess (*javaProcess)();
              void (*performAgentInitialization)(libdrill_agent_kref_kotlin_collections_Map initialParams);
              libdrill_agent_kref_com_epam_drill_agent_Config (*updateConfig)(libdrill_agent_kref_kotlin_Function1 block);
              void (*updateConfigs)(libdrill_agent_kref_kotlin_collections_Map parameters, libdrill_agent_kref_kotlin_collections_Map initialParams);
              libdrill_agent_kref_com_epam_drill_agent_State (*updateState)(libdrill_agent_kref_kotlin_Function1 block);
              libdrill_agent_KBoolean (*allWebAppsInitialized)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
              libdrill_agent_KBoolean (*matches)(const char* thiz, libdrill_agent_kref_kotlin_collections_Iterable others, libdrill_agent_KInt thisOffset);
              const char* (*toType)(libdrill_agent_kref_kotlin_Any thiz);
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_AgentArguments (*AgentArguments)(libdrill_agent_KInt seen1, const char* agentId, const char* adminAddress, const char* drillInstallationDir, const char* buildVersion, const char* instanceId, const char* groupId, const char* logLevel, const char* logFile, libdrill_agent_KBoolean isWebApp, libdrill_agent_KBoolean isKafka, libdrill_agent_KBoolean isTlsApp, libdrill_agent_KBoolean isAsyncApp, const char* webAppNames, libdrill_agent_KLong classScanDelay, libdrill_agent_kref_kotlinx_serialization_internal_SerializationConstructorMarker serializationConstructorMarker);
                libdrill_agent_kref_com_epam_drill_agent_AgentArguments (*AgentArguments_)(const char* agentId, const char* adminAddress, const char* drillInstallationDir, const char* buildVersion, const char* instanceId, const char* groupId, const char* logLevel, const char* logFile, libdrill_agent_KBoolean isWebApp, libdrill_agent_KBoolean isKafka, libdrill_agent_KBoolean isTlsApp, libdrill_agent_KBoolean isAsyncApp, const char* webAppNames, libdrill_agent_KLong classScanDelay);
                const char* (*get_adminAddress)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_agentId)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_buildVersion)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KLong (*get_classScanDelay)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_drillInstallationDir)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_groupId)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_instanceId)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*get_isAsyncApp)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*get_isKafka)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*get_isTlsApp)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*get_isWebApp)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_logFile)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_logLevel)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*get_webAppNames)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component1)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*component10)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*component11)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*component12)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component13)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KLong (*component14)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component2)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component3)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component4)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component5)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component6)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component7)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*component8)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*component9)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_kref_com_epam_drill_agent_AgentArguments (*copy)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz, const char* agentId, const char* adminAddress, const char* drillInstallationDir, const char* buildVersion, const char* instanceId, const char* groupId, const char* logLevel, const char* logFile, libdrill_agent_KBoolean isWebApp, libdrill_agent_KBoolean isKafka, libdrill_agent_KBoolean isTlsApp, libdrill_agent_KBoolean isAsyncApp, const char* webAppNames, libdrill_agent_KLong classScanDelay);
                libdrill_agent_kref_kotlin_collections_Map (*defaultParameters)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                libdrill_agent_KBoolean (*equals)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz, libdrill_agent_kref_kotlin_Any other);
                libdrill_agent_KInt (*hashCode)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                const char* (*toString)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments thiz);
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer (*_instance)();
                  libdrill_agent_kref_kotlinx_serialization_descriptors_SerialDescriptor (*get_descriptor)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer thiz);
                  libdrill_agent_kref_kotlin_Array (*childSerializers)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer thiz);
                  libdrill_agent_kref_com_epam_drill_agent_AgentArguments (*deserialize)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer thiz, libdrill_agent_kref_kotlinx_serialization_encoding_Decoder decoder);
                  void (*serialize)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments_$serializer thiz, libdrill_agent_kref_kotlinx_serialization_encoding_Encoder encoder, libdrill_agent_kref_com_epam_drill_agent_AgentArguments value);
                } $serializer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_AgentArguments_Companion (*_instance)();
                  libdrill_agent_kref_kotlinx_serialization_KSerializer (*serializer)(libdrill_agent_kref_com_epam_drill_agent_AgentArguments_Companion thiz);
                } Companion;
              } AgentArguments;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_Config (*Config)(libdrill_agent_KDouble classScanDelay, libdrill_agent_KBoolean isAsyncApp, libdrill_agent_KBoolean isWebApp, libdrill_agent_KBoolean isKafka, libdrill_agent_KBoolean isTlsApp, libdrill_agent_KDouble webAppLoadingTimeout, libdrill_agent_kref_kotlin_collections_List webApps, const char* coreLibPath);
                libdrill_agent_KDouble (*get_classScanDelay)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                const char* (*get_coreLibPath)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*get_isAsyncApp)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*get_isKafka)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*get_isTlsApp)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*get_isWebApp)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KDouble (*get_webAppLoadingTimeout)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_kref_kotlin_collections_List (*get_webApps)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KDouble (*component1)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*component2)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*component3)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*component4)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KBoolean (*component5)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_KDouble (*component6)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_kref_kotlin_collections_List (*component7)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                const char* (*component8)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                libdrill_agent_kref_com_epam_drill_agent_Config (*copy)(libdrill_agent_kref_com_epam_drill_agent_Config thiz, libdrill_agent_KDouble classScanDelay, libdrill_agent_KBoolean isAsyncApp, libdrill_agent_KBoolean isWebApp, libdrill_agent_KBoolean isKafka, libdrill_agent_KBoolean isTlsApp, libdrill_agent_KDouble webAppLoadingTimeout, libdrill_agent_kref_kotlin_collections_List webApps, const char* coreLibPath);
                libdrill_agent_KBoolean (*equals)(libdrill_agent_kref_com_epam_drill_agent_Config thiz, libdrill_agent_kref_kotlin_Any other);
                libdrill_agent_KInt (*hashCode)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
                const char* (*toString)(libdrill_agent_kref_com_epam_drill_agent_Config thiz);
              } Config;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_DataService (*_instance)();
                libdrill_agent_kref_kotlin_Any (*createAgentPart)(libdrill_agent_kref_com_epam_drill_agent_DataService thiz, const char* id, const char* jarPath);
                libdrill_agent_kref_kotlin_Any (*doRawActionBlocking)(libdrill_agent_kref_com_epam_drill_agent_DataService thiz, libdrill_agent_kref_kotlin_Any agentPart, const char* data);
                libdrill_agent_kref_kotlin_ByteArray (*retrieveClassesData)(libdrill_agent_kref_com_epam_drill_agent_DataService thiz, const char* config);
              } DataService;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_DataServiceStub (*_instance)();
                void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz);
                void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, void* set);
                libdrill_agent_kref_kotlin_Any (*createAgentPart)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, const char* id, const char* jarPath);
                libdrill_agent_kref_kotlin_Any (*doRawActionBlocking)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, libdrill_agent_kref_kotlin_Any agentPart, const char* data);
                libdrill_agent_kref_com_epam_drill_agent_DataServiceStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, void* ignored);
                libdrill_agent_kref_kotlin_ByteArray (*retrieveClassesData)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, const char* config);
                void* (*self)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz);
                void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_DataServiceStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
              } DataServiceStub;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_Gaps (*Gaps)(libdrill_agent_KBoolean interrupted, libdrill_agent_KBoolean spacedString);
                libdrill_agent_KBoolean (*get_interrupted)(libdrill_agent_kref_com_epam_drill_agent_Gaps thiz);
                void (*set_interrupted)(libdrill_agent_kref_com_epam_drill_agent_Gaps thiz, libdrill_agent_KBoolean set);
                libdrill_agent_KBoolean (*get_spacedString)(libdrill_agent_kref_com_epam_drill_agent_Gaps thiz);
                void (*set_spacedString)(libdrill_agent_kref_com_epam_drill_agent_Gaps thiz, libdrill_agent_KBoolean set);
              } Gaps;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_JavaProcess (*JavaProcess)(libdrill_agent_kref_kotlin_collections_MutableList javaAgents, libdrill_agent_kref_kotlin_collections_MutableList nativeAgents, const char* processPath, const char* classpath, const char* jar, libdrill_agent_kref_kotlin_collections_List javaParams);
                const char* (*get_classpath)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                void (*set_classpath)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, const char* set);
                const char* (*get_firstAgentPath)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*get_jar)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                void (*set_jar)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, const char* set);
                libdrill_agent_kref_kotlin_collections_MutableList (*get_javaAgents)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                libdrill_agent_kref_kotlin_collections_List (*get_javaParams)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                void (*set_javaParams)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, libdrill_agent_kref_kotlin_collections_List set);
                libdrill_agent_kref_kotlin_collections_MutableList (*get_nativeAgents)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*get_processPath)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                void (*set_processPath)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, const char* set);
                libdrill_agent_kref_kotlin_collections_MutableList (*component1)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                libdrill_agent_kref_kotlin_collections_MutableList (*component2)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*component3)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*component4)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*component5)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                libdrill_agent_kref_kotlin_collections_List (*component6)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                libdrill_agent_kref_com_epam_drill_agent_JavaProcess (*copy)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, libdrill_agent_kref_kotlin_collections_MutableList javaAgents, libdrill_agent_kref_kotlin_collections_MutableList nativeAgents, const char* processPath, const char* classpath, const char* jar, libdrill_agent_kref_kotlin_collections_List javaParams);
                libdrill_agent_KBoolean (*equals)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz, libdrill_agent_kref_kotlin_Any other);
                libdrill_agent_KInt (*hashCode)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
                const char* (*toString)(libdrill_agent_kref_com_epam_drill_agent_JavaProcess thiz);
              } JavaProcess;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_NativeRegistry (*_instance)();
                void (*loadLibrary)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistry thiz, const char* path);
              } NativeRegistry;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub (*_instance)();
                void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz);
                void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz, void* set);
                libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz, void* ignored);
                void (*loadLibrary)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz, const char* path);
                void* (*self)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz);
                void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_NativeRegistryStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
              } NativeRegistryStub;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_agent_State (*State)(libdrill_agent_kref_kotlin_time_TimeMark startMark, libdrill_agent_KBoolean alive, libdrill_agent_kref_kotlin_collections_Map webApps, libdrill_agent_kref_kotlin_collections_List packagePrefixes);
                libdrill_agent_KBoolean (*get_alive)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_collections_List (*get_packagePrefixes)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_time_TimeMark (*get_startMark)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_collections_Map (*get_webApps)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_time_TimeMark (*component1)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_KBoolean (*component2)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_collections_Map (*component3)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_kotlin_collections_List (*component4)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                libdrill_agent_kref_com_epam_drill_agent_State (*copy)(libdrill_agent_kref_com_epam_drill_agent_State thiz, libdrill_agent_kref_kotlin_time_TimeMark startMark, libdrill_agent_KBoolean alive, libdrill_agent_kref_kotlin_collections_Map webApps, libdrill_agent_kref_kotlin_collections_List packagePrefixes);
                libdrill_agent_KBoolean (*equals)(libdrill_agent_kref_com_epam_drill_agent_State thiz, libdrill_agent_kref_kotlin_Any other);
                libdrill_agent_KInt (*hashCode)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
                const char* (*toString)(libdrill_agent_kref_com_epam_drill_agent_State thiz);
              } State;
              struct {
                libdrill_agent_KType* (*_type)(void);
                const char* (*get_apiName)(libdrill_agent_kref_com_epam_drill_agent_Type thiz);
                struct {
                  libdrill_agent_kref_com_epam_drill_agent_Type (*get)(); /* enum entry for STRING. */
                } STRING;
                struct {
                  libdrill_agent_kref_com_epam_drill_agent_Type (*get)(); /* enum entry for BOOLEAN. */
                } BOOLEAN;
                struct {
                  libdrill_agent_kref_com_epam_drill_agent_Type (*get)(); /* enum entry for INTEGER. */
                } INTEGER;
              } Type;
              struct {
                void (*webAppStarted)(void* env, void* thiz, void* arg1);
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSource (*_instance)();
                  void (*webAppStarted)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSource thiz, const char* appPath);
                } WebContainerSource;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz, void* set);
                  void (*fillWebAppSource)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz, const char* warPath, libdrill_agent_kref_kotlin_Any warResource);
                  libdrill_agent_kref_kotlin_Any (*getAdditionalSources)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz);
                  libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_classloading_WebContainerSourceStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } WebContainerSourceStub;
              } classloading;
              struct {
                void* (*idHeaderConfigKey)(void* env, void* thiz);
                void* (*idHeaderConfigValue)(void* env, void* thiz);
                void* (*retrieveAdminAddress)(void* env, void* thiz);
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformer (*_instance)();
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformer thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                } KafkaTransformer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz, void* set);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_instrument_KafkaTransformerStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } KafkaTransformerStub;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformer (*_instance)();
                  const char* (*get_SSL_ENGINE_CLASS_NAME)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformer thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                } SSLTransformer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz, void* set);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_instrument_SSLTransformerStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } SSLTransformerStub;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer (*_instance)();
                  libdrill_agent_kref_kotlin_collections_List (*get_directTtlClasses)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer thiz);
                  const char* (*get_poolExecutor)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer thiz);
                  const char* (*get_runnableInterface)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer thiz);
                  const char* (*get_timerTaskClass)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformer thiz, libdrill_agent_kref_kotlin_Any loader, const char* classFile, libdrill_agent_kref_kotlin_Any classBeingRedefined, libdrill_agent_kref_kotlin_ByteArray classFileBuffer);
                } TTLTransformer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz, void* set);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz, libdrill_agent_kref_kotlin_Any loader, const char* classFile, libdrill_agent_kref_kotlin_Any classBeingRedefined, libdrill_agent_kref_kotlin_ByteArray classFileBuffer);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_instrument_TTLTransformerStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } TTLTransformerStub;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer (*_instance)();
                  libdrill_agent_kref_kotlin_ByteArray (*idHeaderConfigKey)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*idHeaderConfigValue)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*retrieveAdminAddress)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformer thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classFileBuffer, libdrill_agent_kref_kotlin_Any loader);
                } TomcatTransformer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz, void* set);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classFileBuffer, libdrill_agent_kref_kotlin_Any loader);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_instrument_TomcatTransformerStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } TomcatTransformerStub;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_Transformer (*_instance)();
                  const char* (*get_servletListener)(libdrill_agent_kref_com_epam_drill_agent_instrument_Transformer thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_Transformer thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                } Transformer;
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub (*_instance)();
                  void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz);
                  void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz, void* set);
                  libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub (*invoke)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz, void* ignored);
                  void* (*self)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz);
                  libdrill_agent_kref_kotlin_ByteArray (*transform)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray classfileBuffer, libdrill_agent_kref_kotlin_Any loader);
                  void* (*self_)(libdrill_agent_kref_com_epam_drill_agent_instrument_TransformerStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
                } TransformerStub;
              } instrument;
              struct {
                struct {
                  libdrill_agent_KType* (*_type)(void);
                  libdrill_agent_kref_com_epam_drill_agent_serialization_SimpleMapDecoder (*SimpleMapDecoder)(libdrill_agent_kref_kotlinx_serialization_modules_SerializersModule serializersModule, libdrill_agent_kref_kotlin_collections_Map map);
                  libdrill_agent_kref_kotlinx_serialization_modules_SerializersModule (*get_serializersModule)(libdrill_agent_kref_com_epam_drill_agent_serialization_SimpleMapDecoder thiz);
                  libdrill_agent_KInt (*decodeElementIndex)(libdrill_agent_kref_com_epam_drill_agent_serialization_SimpleMapDecoder thiz, libdrill_agent_kref_kotlinx_serialization_descriptors_SerialDescriptor descriptor);
                  libdrill_agent_kref_kotlin_Any (*decodeValue)(libdrill_agent_kref_com_epam_drill_agent_serialization_SimpleMapDecoder thiz);
                } SimpleMapDecoder;
              } serialization;
            } agent;
            struct {
              void* (*JNIEn_)();
              void* (*JNIFun_)();
              void* (*currentThread_)();
              void (*disableJvmtiEventBreakpoint_)(void* thread);
              void (*disableJvmtiEventClassFileLoadHook_)(void* thread);
              void (*disableJvmtiEventClassLoad_)(void* thread);
              void (*disableJvmtiEventClassPrepare_)(void* thread);
              void (*disableJvmtiEventCompiledMethodLoad_)(void* thread);
              void (*disableJvmtiEventCompiledMethodUnload_)(void* thread);
              void (*disableJvmtiEventDataDumpRequest_)(void* thread);
              void (*disableJvmtiEventDynamicCodeGenerated_)(void* thread);
              void (*disableJvmtiEventException_)(void* thread);
              void (*disableJvmtiEventExceptionCatch_)(void* thread);
              void (*disableJvmtiEventFieldAccess_)(void* thread);
              void (*disableJvmtiEventFieldModification_)(void* thread);
              void (*disableJvmtiEventFramePop_)(void* thread);
              void (*disableJvmtiEventGarbageCollectionFinish_)(void* thread);
              void (*disableJvmtiEventGarbageCollectionStart_)(void* thread);
              void (*disableJvmtiEventMethodEntry_)(void* thread);
              void (*disableJvmtiEventMethodExit_)(void* thread);
              void (*disableJvmtiEventMonitorContendedEnter_)(void* thread);
              void (*disableJvmtiEventMonitorContendedEntered_)(void* thread);
              void (*disableJvmtiEventMonitorWait_)(void* thread);
              void (*disableJvmtiEventMonitorWaited_)(void* thread);
              void (*disableJvmtiEventNativeMethodBind_)(void* thread);
              void (*disableJvmtiEventObjectFree_)(void* thread);
              void (*disableJvmtiEventResourceExhausted_)(void* thread);
              void (*disableJvmtiEventSingleStep_)(void* thread);
              void (*disableJvmtiEventThreadEnd_)(void* thread);
              void (*disableJvmtiEventThreadStart_)(void* thread);
              void (*disableJvmtiEventVmDeath_)(void* thread);
              void (*disableJvmtiEventVmInit_)(void* thread);
              void (*disableJvmtiEventVmObjectAlloc_)(void* thread);
              void (*disableJvmtiEventVmStart_)(void* thread);
              void* (*drillCRequest)(void* thread);
              libdrill_agent_kref_com_epam_drill_plugin_DrillRequest (*drillRequest_)();
              void (*enableJvmtiEventBreakpoint_)(void* thread);
              void (*enableJvmtiEventClassFileLoadHook_)(void* thread);
              void (*enableJvmtiEventClassLoad_)(void* thread);
              void (*enableJvmtiEventClassPrepare_)(void* thread);
              void (*enableJvmtiEventCompiledMethodLoad_)(void* thread);
              void (*enableJvmtiEventCompiledMethodUnload_)(void* thread);
              void (*enableJvmtiEventDataDumpRequest_)(void* thread);
              void (*enableJvmtiEventDynamicCodeGenerated_)(void* thread);
              void (*enableJvmtiEventException_)(void* thread);
              void (*enableJvmtiEventExceptionCatch_)(void* thread);
              void (*enableJvmtiEventFieldAccess_)(void* thread);
              void (*enableJvmtiEventFieldModification_)(void* thread);
              void (*enableJvmtiEventFramePop_)(void* thread);
              void (*enableJvmtiEventGarbageCollectionFinish_)(void* thread);
              void (*enableJvmtiEventGarbageCollectionStart_)(void* thread);
              void (*enableJvmtiEventMethodEntry_)(void* thread);
              void (*enableJvmtiEventMethodExit_)(void* thread);
              void (*enableJvmtiEventMonitorContendedEnter_)(void* thread);
              void (*enableJvmtiEventMonitorContendedEntered_)(void* thread);
              void (*enableJvmtiEventMonitorWait_)(void* thread);
              void (*enableJvmtiEventMonitorWaited_)(void* thread);
              void (*enableJvmtiEventNativeMethodBind_)(void* thread);
              void (*enableJvmtiEventObjectFree_)(void* thread);
              void (*enableJvmtiEventResourceExhausted_)(void* thread);
              void (*enableJvmtiEventSingleStep_)(void* thread);
              void (*enableJvmtiEventThreadEnd_)(void* thread);
              void (*enableJvmtiEventThreadStart_)(void* thread);
              void (*enableJvmtiEventVmDeath_)(void* thread);
              void (*enableJvmtiEventVmInit_)(void* thread);
              void (*enableJvmtiEventVmObjectAlloc_)(void* thread);
              void (*enableJvmtiEventVmStart_)(void* thread);
              void* (*jvmti)();
              void (*jvmti_)(libdrill_agent_kref_kotlinx_cinterop_CValuesRef callbacks, libdrill_agent_KInt size_of_callbacks);
              void (*sendToSocket_)(const char* pluginId, const char* message);
            } api;
            struct {
            } common;
            struct {
              void* (*GetAllLoadedClasses)(void* env, void* thiz);
              void (*JNI_CreateJavaVM_)();
              void (*JNI_GetCreatedJavaVMs_)();
              void (*JNI_GetDefaultJavaVMInitArgs_)();
              void (*JNI_OnUnload_)();
              libdrill_agent_KUInt (*RetransformClasses)(void* env, void* thiz, libdrill_agent_KInt count, void* classes);
              libdrill_agent_KInt (*RetransformClassesByPackagePrefixes)(void* env, void* thiz, void* prefixes);
              libdrill_agent_KInt (*agentOnLoad)(void* vmPointer, const char* options, libdrill_agent_KLong reservedPtr);
              void (*agentOnUnload)(void* vmPointer);
              libdrill_agent_KUInt (*checkEx_)(libdrill_agent_KUInt errCode, const char* funName);
              void* (*currentEnvs_)();
              void* (*getJvm_)();
              void (*globalCallbacks)();
              void* (*jvmtii_)();
              void (*sendFromJava)(void* envs, void* thiz, void* jpluginId, void* jmessage);
              void (*vmDeathEvent)(void* jvmtiEnv, void* jniEnv);
              libdrill_agent_kref_com_epam_drill_plugin_DrillRequest (*get)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz);
              void (*storeRequestMetadata)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz, libdrill_agent_kref_com_epam_drill_plugin_DrillRequest request);
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_core_Agent (*_instance)();
                libdrill_agent_KBoolean (*get_isHttpHookEnabled)(libdrill_agent_kref_com_epam_drill_core_Agent thiz);
                libdrill_agent_KInt (*agentOnLoad)(libdrill_agent_kref_com_epam_drill_core_Agent thiz, const char* options);
                void (*agentOnUnload)(libdrill_agent_kref_com_epam_drill_core_Agent thiz);
              } Agent;
              struct {
                struct {
                  void (*classLoadEvent)(void* jvmtiEnv, void* jniEnv, void* classBeingRedefined, void* loader, void* clsName, void* protection_domain, libdrill_agent_KInt classDataLen, void* classData, void* newClassDataLen, void* newData);
                } classloading;
                struct {
                  void (*jvmtiEventVMInitEvent)(void* env, void* jniEnv, void* thread);
                } vminit;
              } callbacks;
              struct {
                struct {
                  void (*loadJvmPlugin)(const char* pluginFilePath, libdrill_agent_kref_com_epam_drill_common_PluginMetadata pluginConfig);
                  struct {
                    libdrill_agent_KType* (*_type)(void);
                    libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin (*GenericNativePlugin)(const char* pluginId, void* pluginApiClass, void* userPlugin, libdrill_agent_kref_com_epam_drill_common_PluginMetadata pluginConfig);
                    void* (*get_pluginApiClass)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void* (*get_userPlugin)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*destroyPlugin)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, libdrill_agent_kref_com_epam_drill_plugin_api_processing_UnloadReason unloadReason);
                    void (*initPlugin)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    libdrill_agent_KBoolean (*isEnabled)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*load)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, libdrill_agent_KBoolean on);
                    void (*off)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*on)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*parseAction)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, const char* rawAction);
                    void (*processServerRequest)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*processServerResponse)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz);
                    void (*setEnabled)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, libdrill_agent_KBoolean enabled);
                    void (*unload)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, libdrill_agent_kref_com_epam_drill_plugin_api_processing_UnloadReason unloadReason);
                    void (*updateRawConfig)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_GenericNativePlugin thiz, const char* data);
                  } GenericNativePlugin;
                  struct {
                    libdrill_agent_KType* (*_type)(void);
                    libdrill_agent_kref_com_epam_drill_core_plugin_loader_InstrumentationNativePlugin (*InstrumentationNativePlugin)(const char* pluginId, void* pluginApiClass, void* userPlugin, libdrill_agent_kref_com_epam_drill_common_PluginMetadata pluginConfig, void* qs);
                    libdrill_agent_kref_kotlin_ByteArray (*instrument)(libdrill_agent_kref_com_epam_drill_core_plugin_loader_InstrumentationNativePlugin thiz, const char* className, libdrill_agent_kref_kotlin_ByteArray initialBytes);
                  } InstrumentationNativePlugin;
                } loader;
              } plugin;
            } core;
            struct {
              libdrill_agent_KInt (*getLogLevel)(void* env, void* thiz);
              void (*output)(void* env, void* thiz, void* arg1);
              void (*setFilename)(void* env, void* thiz, void* arg1);
              void (*setLogLevel)(void* env, void* thiz, libdrill_agent_KInt arg1);
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_logger_NativeApiStub (*_instance)();
                void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_logger_NativeApiStub thiz);
                void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_logger_NativeApiStub thiz, void* set);
                libdrill_agent_kref_com_epam_drill_logger_NativeApiStub (*invoke)(libdrill_agent_kref_com_epam_drill_logger_NativeApiStub thiz, void* ignored);
                void* (*self)(libdrill_agent_kref_com_epam_drill_logger_NativeApiStub thiz);
                void* (*self_)(libdrill_agent_kref_com_epam_drill_logger_NativeApiStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
              } NativeApiStub;
            } logger;
            struct {
              void (*processServerRequest)(void* env, void* thiz);
              void (*processServerResponse)(void* env, void* thiz);
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_request_PluginExtension (*_instance)();
                void (*processServerRequest)(libdrill_agent_kref_com_epam_drill_request_PluginExtension thiz);
                void (*processServerResponse)(libdrill_agent_kref_com_epam_drill_request_PluginExtension thiz);
              } PluginExtension;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub (*_instance)();
                void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub thiz);
                void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub thiz, void* set);
                libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub (*invoke)(libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub thiz, void* ignored);
                void* (*self)(libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub thiz);
                void* (*self_)(libdrill_agent_kref_com_epam_drill_request_PluginExtensionStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
              } PluginExtensionStub;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_request_RequestHolder (*_instance)();
                void (*closeSession)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz);
                libdrill_agent_kref_kotlin_ByteArray (*dump)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz);
                void (*init)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz, libdrill_agent_KBoolean isAsync);
                void (*store)(libdrill_agent_kref_com_epam_drill_request_RequestHolder thiz, libdrill_agent_kref_kotlin_ByteArray drillRequest);
              } RequestHolder;
              struct {
                libdrill_agent_KType* (*_type)(void);
                libdrill_agent_kref_com_epam_drill_request_RequestHolderStub (*_instance)();
                void* (*get_selfMethodId)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz);
                void (*set_selfMethodId)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, void* set);
                void (*closeSession)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz);
                libdrill_agent_kref_kotlin_ByteArray (*dump)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz);
                libdrill_agent_kref_kotlin_Any (*getAgentContext)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz);
                void (*init)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, libdrill_agent_KBoolean isAsync);
                libdrill_agent_kref_com_epam_drill_request_RequestHolderStub (*invoke)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, void* ignored);
                void* (*self)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz);
                void (*store)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, libdrill_agent_kref_kotlin_ByteArray drillRequest);
                void (*storeRequest)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, libdrill_agent_kref_kotlin_Any drillRequest);
                void* (*self_)(libdrill_agent_kref_com_epam_drill_request_RequestHolderStub thiz, libdrill_agent_kref_kotlin_Any thiz1);
              } RequestHolderStub;
            } request;
          } drill;
        } epam;
      } com;
    } root;
  } kotlin;
} libdrill_agent_ExportedSymbols;
extern libdrill_agent_ExportedSymbols* libdrill_agent_symbols(void);
#ifdef __cplusplus
}  /* extern "C" */
#endif
#endif  /* KONAN_LIBDRILL_AGENT_H */
