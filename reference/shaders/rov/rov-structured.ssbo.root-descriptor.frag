#version 460
#extension GL_EXT_buffer_reference2 : require
#ifdef GL_ARB_fragment_shader_interlock
#extension GL_ARB_fragment_shader_interlock : enable
#define SPIRV_Cross_beginInvocationInterlock() beginInvocationInterlockARB()
#define SPIRV_Cross_endInvocationInterlock() endInvocationInterlockARB()
#elif defined(GL_INTEL_fragment_shader_ordering)
#extension GL_INTEL_fragment_shader_ordering : enable
#define SPIRV_Cross_beginInvocationInterlock() beginFragmentShaderOrderingINTEL()
#define SPIRV_Cross_endInvocationInterlock()
#endif
#extension GL_EXT_buffer_reference_uvec2 : require
#if defined(GL_ARB_fragment_shader_interlock)
layout(pixel_interlock_ordered) in;
#elif !defined(GL_INTEL_fragment_shader_ordering)
#error Fragment Shader Interlock/Ordering extension missing!
#endif
layout(early_fragment_tests) in;

layout(buffer_reference) buffer PhysicalPointerFloat4CoherentArray;

layout(buffer_reference, buffer_reference_align = 4, std430) coherent buffer PhysicalPointerFloat4CoherentArray
{
    vec4 value[];
};

layout(push_constant, std430) uniform RootConstants
{
    uvec2 _m0;
    uvec2 _m1;
    uvec2 _m2;
    uvec2 _m3;
} registers;

void main()
{
    uint _29 = (uint(gl_FragCoord.y) * 1000u) + uint(gl_FragCoord.x);
    PhysicalPointerFloat4CoherentArray _33 = PhysicalPointerFloat4CoherentArray(registers._m2);
    SPIRV_Cross_beginInvocationInterlock();
    PhysicalPointerFloat4CoherentArray(registers._m2).value[_29] = vec4(_33.value[_29].x + 1.0, _33.value[_29].y + 2.0, _33.value[_29].z + 3.0, _33.value[_29].w + 4.0);
    SPIRV_Cross_endInvocationInterlock();
}


#if 0
// SPIR-V disassembly
; SPIR-V
; Version: 1.3
; Generator: Unknown(30017); 21022
; Bound: 54
; Schema: 0
OpCapability Shader
OpCapability PhysicalStorageBufferAddresses
OpCapability FragmentShaderPixelInterlockEXT
OpExtension "SPV_EXT_fragment_shader_interlock"
OpExtension "SPV_KHR_physical_storage_buffer"
OpMemoryModel PhysicalStorageBuffer64 GLSL450
OpEntryPoint Fragment %3 "main" %13
OpExecutionMode %3 OriginUpperLeft
OpExecutionMode %3 EarlyFragmentTests
OpExecutionMode %3 PixelInterlockOrderedEXT
OpName %3 "main"
OpName %7 "RootConstants"
OpName %9 "registers"
OpName %13 "SV_Position"
OpName %31 "PhysicalPointerFloat4CoherentArray"
OpMemberName %31 0 "value"
OpDecorate %7 Block
OpMemberDecorate %7 0 Offset 0
OpMemberDecorate %7 1 Offset 8
OpMemberDecorate %7 2 Offset 16
OpMemberDecorate %7 3 Offset 24
OpDecorate %13 BuiltIn FragCoord
OpDecorate %30 ArrayStride 16
OpMemberDecorate %31 0 Offset 0
OpDecorate %31 Block
OpMemberDecorate %31 0 Coherent
%1 = OpTypeVoid
%2 = OpTypeFunction %1
%5 = OpTypeInt 32 0
%6 = OpTypeVector %5 2
%7 = OpTypeStruct %6 %6 %6 %6
%8 = OpTypePointer PushConstant %7
%9 = OpVariable %8 PushConstant
%10 = OpTypeFloat 32
%11 = OpTypeVector %10 4
%12 = OpTypePointer Input %11
%13 = OpVariable %12 Input
%14 = OpTypePointer PushConstant %6
%16 = OpConstant %5 2
%18 = OpTypePointer Input %10
%20 = OpConstant %5 0
%23 = OpConstant %5 1
%28 = OpConstant %5 1000
%30 = OpTypeRuntimeArray %11
%31 = OpTypeStruct %30
%32 = OpTypePointer PhysicalStorageBuffer %31
%34 = OpTypePointer PhysicalStorageBuffer %11
%42 = OpConstant %10 1
%44 = OpConstant %10 2
%46 = OpConstant %10 3
%48 = OpConstant %10 4
%3 = OpFunction %1 None %2
%4 = OpLabel
OpBranch %52
%52 = OpLabel
%15 = OpAccessChain %14 %9 %16
%17 = OpLoad %6 %15
%19 = OpAccessChain %18 %13 %20
%21 = OpLoad %10 %19
%22 = OpAccessChain %18 %13 %23
%24 = OpLoad %10 %22
%25 = OpConvertFToU %5 %21
%26 = OpConvertFToU %5 %24
%27 = OpIMul %5 %26 %28
%29 = OpIAdd %5 %27 %25
%33 = OpBitcast %32 %17
%35 = OpInBoundsAccessChain %34 %33 %20 %29
OpBeginInvocationInterlockEXT
%36 = OpLoad %11 %35 Aligned 4
%37 = OpCompositeExtract %10 %36 0
%38 = OpCompositeExtract %10 %36 1
%39 = OpCompositeExtract %10 %36 2
%40 = OpCompositeExtract %10 %36 3
%41 = OpFAdd %10 %37 %42
%43 = OpFAdd %10 %38 %44
%45 = OpFAdd %10 %39 %46
%47 = OpFAdd %10 %40 %48
%49 = OpBitcast %32 %17
%50 = OpInBoundsAccessChain %34 %49 %20 %29
%51 = OpCompositeConstruct %11 %41 %43 %45 %47
OpStore %50 %51 Aligned 4
OpEndInvocationInterlockEXT
OpReturn
OpFunctionEnd
#endif
